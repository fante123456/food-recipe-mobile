import { StyleSheet, View, Pressable } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { Text } from "react-native-paper";
import { COLORS } from "../constants";
import RoundedButton from "../components/Buttons/RoundedButton";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [serve, setServe] = useState("");

  const textInputStyle = {
    textAlignVertical: "top",
    borderColor: "tomato",
    borderWidth: 1.2,
    borderStyle: "dotted",
    padding: moderateScale(15),
    // height: moderateScale(200),
  };

  const textInputConstants = {
    style: [textInputStyle],
    placeholderTextColor: "black",
    cursorColor: "black",
  };

  const textInputs = [
    // numberOfLines: 5,
    // keyboardType: "numeric",
    {
      title: "Title",
      placeholder: "Write your title.",
      setter: setTitle,
      multiline: false,
      maxLength: 50,
      ...textInputConstants,
    },
    {
      title: "Brief",
      placeholder: "Write your brief.",
      setter: setBrief,
      multiline: true,
      maxLength: 500,

      ...textInputConstants,
    },
    {
      title: "Instructions",
      placeholder: "Write your instructions",
      setter: setInstructions,
      multiline: true,
      maxLength: 450,
      ...textInputConstants,
    },
    {
      title: "Ingredients",
      placeholder: "Write your instructions one under another.",
      setter: setIngredients,
      multiline: true,
      maxLength: 400,
      ...textInputConstants,
    },
    {
      title: "Cook Time",
      placeholder: "Cook time for recipe as minute.",
      setter: setCookTime,
      maxLength: 15,
      keyboardType: "numeric",
      ...textInputConstants,
    },
    {
      title: "Serve",
      placeholder: "Serve for how many people?",
      setter: setServe,
      maxLength: 15,
      keyboardType: "numeric",
      ...textInputConstants,
    },
  ];

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {textInputs.map((input, index) => (
        <View style={{ padding: moderateScale(20) }} key={index}>
          <Text variant="headlineSmall" style={styles.titleForInput}>
            {input.title}
          </Text>
          <TextInput
            {...textInputStyle}
            {...input}
            onChangeText={(val) => input.setter(val)}
          />
        </View>
      ))}
      <View
        style={{
          marginHorizontal: moderateScale(50),
          marginBottom: verticalScale(20),
        }}
      >
        <RoundedButton
          text="Add recipe"
          buttonOnPress={() =>
            console.log(title.includes("\n"), title.split("\n"))
          }
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },

  titleForInput: {
    color: COLORS.darkBlue,
    marginBottom: verticalScale(10),
    fontWeight: "bold",
  },
});
