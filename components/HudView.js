import React from "react";
import { ActivityIndicator, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { COLORS } from "../constants";

const HudView = () => {
  return (
    <ProgressBar
      indeterminate={true}
      color="tomato"
      borderRadius={0}
      width={null}
      height={3}
      borderWidth={0}
    />
  );
  // return (
  //   <View
  //     style={{
  //       position: "absolute",
  //       left: 0,
  //       right: 0,
  //       top: 0,
  //       bottom: 0,
  //       alignItems: "center",
  //       justifyContent: "center",
  //       backgroundColor: COLORS.transparentBlack3,
  //       zIndex: 1500,
  //     }}
  //   >
  //     <ActivityIndicator size="large" color="orange" />
  //   </View>
  // );
};

export default HudView;
