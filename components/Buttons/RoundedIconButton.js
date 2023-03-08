import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { horizontalScale, moderateScale, verticalScale } from "../../Metrics";
import Ripple from "react-native-material-ripple";

const RoundedIconButton = (props) => {
  const { text, image, bgColor, btnOnPress } = props;

  return (
    <Ripple
      onPress={btnOnPress}
      style={{
        backgroundColor: bgColor,
        height: moderateScale(50),
        // width: moderateScale(300),
        flex: 1,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: verticalScale(20),
        flexDirection: "row",
      }}
    >
      <Image source={image} style={styles.icon} />
      <Text style={styles.buttonText}>{text}</Text>
    </Ripple>
  );
};

export default RoundedIconButton;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(50),
    width: moderateScale(300),
    borderRadius: 16,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(20),
    flexDirection: "row",
  },
  buttonText: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: "#7b8ca6",
  },
  icon: {
    marginRight: horizontalScale(30),
    width: 30,
    height: 30,
  },
});
