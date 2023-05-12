import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Button, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { moderateScale, verticalScale } from "../Metrics";
import { storage, updateField } from "../utils/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Navigation/Header";

const Edit = ({ route, navigation }) => {
  const { userSnap } = route.params;

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const imagePath = "profile/profilePicture.jpg";

  const _handleButton = () => {
    navigation.navigate("Profile", {
      userSnap: userSnap,
    });
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5, 3],
        quality: 1,
      });
      const source = { uri: result.assets[0].uri };
      console.log(source);
      // setImage(source);

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const filename = result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf("/") + 1
        );
        const storageRef = ref(storage, `User/${userSnap.uid}/${imagePath}`);
        await uploadBytes(storageRef, blob);
        getDownloadURL(storageRef).then((downloadURL) => {
          updateField("User", userSnap.uid, {
            photoUrl: downloadURL,
          });
          userSnap.photoUrl = downloadURL;
          console.log("Image uploaded to Firebase Storage:", downloadURL);
        });
        // https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/Defaults%2FdefaultAvatar.png?alt=media&token=aac8b48a-2ce0-4313-8758-662598700004
      }
    } catch (error) {
      Alert.alert("Error", "Eror uploading image");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* {_header()} */}
      <Header handlePress={_handleButton} color="black" headerTitle="Edit" />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: moderateScale(85),
              height: moderateScale(85),
              borderRadius: 100,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default Edit;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },

  header: {
    width: "100%",
    zIndex: 11,
    padding: moderateScale(10),
    alignItems: "center",
    flexDirection: "row",
    gap: verticalScale(20),
  },
});
