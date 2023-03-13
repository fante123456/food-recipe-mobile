import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { horizontalScale, moderateScale } from "../../Metrics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants";
import { TextInput } from "react-native-gesture-handler";

const SearchBar = (props) => {
  const { setVal } = props;
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={moderateScale(22)} />
      <TextInput
        placeholder="Search your recipes"
        selectionColor={COLORS.transparentBlack5}
        style={styles.text}
        onChangeText={(val) => setVal(val)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: horizontalScale(10),
    borderWidth: 2,
    borderRadius: 30,
    borderColor: COLORS.transparentBlack3,
  },
  text: {
    marginLeft: moderateScale(8),
    color: COLORS.transparentBlack5,
  },
});
