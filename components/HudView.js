import React from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../constants";

const HudView = () => {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.transparentBlack3,
        zIndex: 1500,
      }}
    >
      <ActivityIndicator size="large" color="orange" />
    </View>
  );
};

export default HudView;
