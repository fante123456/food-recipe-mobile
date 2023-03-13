import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale } from "../Metrics";
import { defAvatar } from "../assets";
import { TouchableOpacity } from "react-native";

const Avatar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("1123")}>
        <Image source={defAvatar} style={styles.image} />
      </TouchableOpacity>
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
