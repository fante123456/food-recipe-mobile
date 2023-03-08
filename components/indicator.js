import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { verticalScale } from "../Metrics";

const Indicator = () => {
  return (
    <ActivityIndicator
      size={"large"}
      color="#0065ff"
      style={{
        position: "absolute",
        marginTop: verticalScale(350),
        alignSelf: "center",
      }}
    />
  );
};

export default Indicator;
