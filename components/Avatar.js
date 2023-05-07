import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale } from "../Metrics";
import { defAvatar } from "../assets";
import { TouchableOpacity } from "react-native";
import { auth } from "../utils/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../hooks/UserContext";

const Avatar = (props) => {
  const navigation = useNavigation();
  //homepage

  const { avatar, itemSnap } = props;
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          console.log("avatar pressed");
          // auth.signOut().then(() => navigation.navigate(Login));
          // auth
          //   .signOut()
          //   .then(async () => {
          //     Alert.alert("succes");
          //   })
          //   .catch((err) => console.log(err));
          navigation.push("Profile", { snap: null });
        }}
      >
        <Image source={{ uri: avatar }} style={styles.image} />
      </Pressable>
      {/* <TouchableOpacity activeOpacity={0.8}></TouchableOpacity> */}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
});
