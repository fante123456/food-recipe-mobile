import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { horizontalScale, moderateScale, verticalScale } from "../../Metrics";
import Ionicons from "@expo/vector-icons/Ionicons";

///

const input = (props) => {
  const { ...inputProps } = props;
  return (
    <View style={styles.inputContainer}>
      <Ionicons
        name={inputProps.iconName}
        size={moderateScale(30)}
        color={"#7b8ca6"}
      />
      <TextInput
        style={styles.input}
        {...inputProps}
        onChangeText={(val) => {
          inputProps.setValue(val);
        }}
      />
    </View>
  );
  // return Object.values(props).map((value) => {
  //   return (
  //     <View style={styles.inputContainer} key={value.id}>
  //       <Ionicons
  //         name={value.iconName}
  //         size={moderateScale(30)}
  //         color={"#7b8ca6"}
  //       />
  //       <TextInput
  //         style={styles.input}
  //         placeholder={value.placeHolder}
  //         selectionColor={value.selectionColor}
  //         secureTextEntry={value.secureTextEntry}
  //         textContentType={value.textContentType}
  //         onChangeText={(val) => {
  //           value.setValue(val);
  //         }}
  //       />
  //     </View>
  //   );
  // });

  // return (
  //   <View style={styles.inputContainer}>
  //     <Ionicons name={iconName} size={moderateScale(30)} color={"#7b8ca6"} />

  //     <TextInput
  //       style={styles.input}
  //       placeholder={placeHolder}
  //       selectionColor={selectionColor}
  //       secureTextEntry={secureTextEntry}
  //       textContentType={textContentType}
  //       onChangeText={(value) => {
  //         setValue(value);
  //       }}
  //     ></TextInput>
  //   </View>
  // );
};

export default input;

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(30),
  },
  input: {
    color: "#0c60d0",
    justifyContent: "center",
    borderBottomColor: "#7b8ca6",
    borderBottomWidth: 2,
    marginLeft: horizontalScale(10),
    padding: moderateScale(7),
    paddingLeft: 0,
    // width: moderateScale(250),
    flex: 1,
    fontSize: moderateScale(15),
  },
});
