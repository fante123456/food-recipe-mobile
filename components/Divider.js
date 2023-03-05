import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";

const Divider = (props) => {
  const { text } = props;
  return (
    <View style={styles.container}>
      <View style={styles.leftSection} />
      <Text style={styles.middleText}>{text}</Text>
      <View style={styles.rightSection} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: horizontalScale(30),
    marginTop: verticalScale(25),
  },
  leftSection: {
    backgroundColor: "#7b8ca6",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  middleText: {
    alignSelf: "center",
    paddingHorizontal: horizontalScale(10),
    fontSize: 16,
    color: "#7b8ca6",
  },
  rightSection: {
    backgroundColor: "#7b8ca6",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
});
