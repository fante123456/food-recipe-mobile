import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  // Text,
  Pressable,
  TouchableNativeFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { storage, updateField } from "../utils/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Navigation/Header";
import HudView from "../components/HudView";
import CustomSnackbar from "../components/Buttons/Alert/CustomSnackbar";
import { COLORS, TEXTS } from "../constants";
import UserAvatar from "../components/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import CustomInput from "../components/Inputs/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RoundedButton from "../components/Buttons/RoundedButton";
import { Text } from "react-native-paper";

const Edit = ({ route, navigation }) => {
  const { userSnap } = route.params;
  const imagePath = "profile/profilePicture.jpg";

  const [snackbarAttr, setSnacbakAttr] = useState({});
  
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [name, setName] = useState(userSnap.name);
  const [about, setAbout] = useState(userSnap.about);
  const [email, setEmail] = useState(userSnap.email);
  const [username, setUsername] = useState(userSnap.username);
  const [profilePicture, setProfilePicture] = useState(userSnap.photoUrl);

  const textInputs = [
    {
      id: 1,
      editable: true,
      placeholder: "Name",
      selectionColor: "orange",
      iconName: "",
      setValue: setName,
      textContentType: "name",
      value: name,
      maxLength: 50,
    },
    {
      id: 2,
      editable: false,
      placeholder: "Username",
      selectionColor: "orange",
      iconName: "",
      setValue: setUsername,
      textContentType: "username",
      value: username,
      color: COLORS.grey,
    },
    {
      id: 3,
      editable: false,
      placeholder: "Email address",
      selectionColor: "orange",
      iconName: "",
      setValue: setEmail,
      textContentType: "emailAddress",
      value: email,
      color: COLORS.grey,
    },
    {
      id: 4,
      editable: true,
      placeholder: "About",
      selectionColor: "orange",
      iconName: "",
      setValue: setAbout,
      textContentType: "none",
      multiline: true,
      numberOfLines: 2,
      value: about,
      maxLength: 100,
    },
  ];

  const _handleBackButton = () => {
    navigation.navigate("Profile", {
      userSnap: userSnap,
    });
  };

  const _setUserSnapShot = (name, username, about, downloadURL) => {
    userSnap.name = name;
    userSnap.username = username;
    userSnap.about = about;
    if (downloadURL !== "") {
      userSnap.photoUrl = downloadURL;
    }
  };

  const _manageLoadingAndErrors = (loadStatus, infoText) => {
    setUploading(loadStatus);
    setSnacbakAttr({
      visible: !loadStatus,
      text: infoText,
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
      setImageSource(result);
      // setImage(source);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _btnUpdate = async () => {
    try {
      setUploading(true);
      if (image) {
        const response = await fetch(imageSource.assets[0].uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `User/${userSnap.uid}/${imagePath}`);

        await uploadBytes(storageRef, blob);
        getDownloadURL(storageRef).then((downloadURL) => {
          updateField("User", userSnap.uid, {
            photoUrl: downloadURL,
            name: name,
            username: username,
            about: about,
          });
          _setUserSnapShot(name, username, about, downloadURL);

          console.log("Image uploaded to Firebase Storage:", downloadURL);

          _manageLoadingAndErrors(false, "Your profile updated succesfully");
        });
      } else {
        updateField("User", userSnap.uid, {
          name: name,
          username: username,
          about: about,
        });
        _setUserSnapShot(name, username, about, "");

        _manageLoadingAndErrors(false, "Your profile updated succesfully");
      }
    } catch (error) {
      console.log(error);
      _manageLoadingAndErrors(false, "Error uploading an image");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Header and loading bar */}
        {uploading ? <HudView /> : null}
        <Header
          handlePress={_handleBackButton}
          color="black"
          headerTitle="Edit Profile"
        />

        <View style={{ flex: 1, padding: moderateScale(20) }}>
          <View style={{ marginTop: verticalScale(-10) }}>
            {/* <Text style={[TEXTS.titleText2, { marginLeft: 0 }]}> */}
            <Text variant="headlineLarge" style={{ color: COLORS.darkBlue }}>
              Account Info
            </Text>
          </View>
          {/* Photo */}
          <View
            style={{
              flexDirection: "row",
              marginTop: verticalScale(20),
              alignItems: "center",
              gap: moderateScale(20),
            }}
          >
            <Pressable onPress={pickImage}>
              <UserAvatar
                image={profilePicture}
                width={moderateScale(77)}
                height={moderateScale(77)}
                position={"flex-start"}
                marginLeft={0}
              />
              <View style={styles.ppEditButtonContainer}>
                <FontAwesome5 name="edit" size={20} color="tomato" />
              </View>
            </Pressable>

            <View style={{ width: "60%" }}>
              <Text style={TEXTS.titleText3}>Picture</Text>
              <Text style={TEXTS.infoText}>
                You can add or change your profile picture
              </Text>
            </View>
          </View>
          <Divider style={styles.divider} bold={true} />
          {/* input details */}
          {textInputs.map((inputVal) => {
            return <CustomInput {...inputVal} key={inputVal.id} />;
          })}
        </View>

        <View style={styles.updateBtn}>
          <RoundedButton text="Update" buttonOnPress={_btnUpdate} />
        </View>

        {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
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
        </View> */}
        {snackbarAttr.visible === true ? (
          <View style={styles.snackbarContainer}>
            <CustomSnackbar
              snackbarAttr={snackbarAttr}
              setter={setSnacbakAttr}
            />
          </View>
        ) : null}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Edit;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
  snackbarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  ppEditButtonContainer: {
    position: "absolute",
    right: -10,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    padding: moderateScale(5),
  },

  divider: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },

  updateBtn: {
    marginHorizontal: horizontalScale(50),
    flex: 1,
    marginTop: moderateScale(-30),
  },
});
