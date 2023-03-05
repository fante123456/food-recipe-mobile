import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { moderateScale, verticalScale } from "../Metrics";
import Ripple from "react-native-material-ripple";

const RoundedButton = (props) => {
  const { text, buttonOnPress } = props;
  return (
    <Ripple onPress={buttonOnPress} style={styles.container}>
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
    marginTop: verticalScale(20),
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default RoundedButton;
