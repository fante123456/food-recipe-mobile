import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "../../Metrics";

const Header = (params) => {
  const { handlePress, color, headerTitle } = params;
  return (
    <View style={styles.header}>
      <Pressable onPress={handlePress}>
        <AntDesign name="arrowleft" size={25} color={color} />
      </Pressable>
      <Text
        style={{
          color: { color },
          fontSize: moderateScale(16),
          fontWeight: "bold",
        }}
      >
        {headerTitle}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: moderateScale(10),
    alignItems: "center",
    flexDirection: "row",
    gap: verticalScale(20),
  },
});
