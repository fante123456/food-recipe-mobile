import { View, Text } from "react-native";
import React, { useEffect } from "react";

export function hideBottomNavBar(navigation) {
  useEffect(() => {
    navigation
      .getParent("tabs")
      .setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent("tabs").setOptions({ tabBarStyle: {} });
    };
  }, [navigation]);
  return { navigation };
}
