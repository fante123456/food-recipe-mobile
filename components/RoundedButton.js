import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, verticalScale } from "../Metrics";

const RoundedButton = (props) => {
  const { text } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0065ff",
    height: moderateScale(50),
    width: moderateScale(300),
    borderRadius: 16,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(30),

  },
  buttonText: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default RoundedButton;
