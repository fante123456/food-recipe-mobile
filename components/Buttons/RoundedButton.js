import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, verticalScale } from "../../Metrics";
import Ripple from "react-native-material-ripple";
import { TouchableNativeFeedback } from "react-native";
import { Pressable } from "react-native";

const RoundedButton = (props) => {
  const { text, buttonOnPress, mt } = props;
  return (
    <Ripple
      onPress={buttonOnPress}
      style={[
        styles.container,
        { marginTop: mt === 0 ? 0 : verticalScale(20) },
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0065ff",
    height: moderateScale(50),
    // width: moderateScale(300),
    flex: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: verticalScale(20),

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default RoundedButton;
