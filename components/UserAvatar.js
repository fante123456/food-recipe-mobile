import { View } from "react-native";
import React from "react";
import { horizontalScale } from "../Metrics";
import { Image } from "react-native";

const UserAvatar = (props) => {
  const { image, width, height, position } = props;
  return (
    <View
      style={{
        height: height,
        marginLeft: horizontalScale(10),
        alignSelf: position,
      }}
    >
      <Image
        resizeMode="stretch"
        // source={{ uri: image }}
        source={{ uri: image }}
        style={{
          flex: 1,
          width: width,
          borderRadius: 30,
        }}
      />
    </View>
  );
};

export default UserAvatar;
