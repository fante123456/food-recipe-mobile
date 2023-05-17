import { StyleSheet, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { Text } from "react-native-paper";
import { COLORS } from "../constants";
import RoundedButton from "../components/Buttons/RoundedButton";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FlashList } from "@shopify/flash-list";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [serve, setServe] = useState("");
  const [images, setImage] = useState([]);

  const textInputStyle = {
    textAlignVertical: "top",
    borderColor: "tomato",
    borderWidth: 1.2,
    borderStyle: "dotted",
    padding: moderateScale(15),
    marginBottom: moderateScale(15),
    // height: moderateScale(200),
  };

  const textInputConstants = {
    style: [textInputStyle],
    placeholderTextColor: COLORS.grey,
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

  const ImageItem = ({ imgUri }) => {
    return (
      <>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="stretch"
            source={{ uri: imgUri }}
            style={styles.recipeImage}
          />
          <Ionicons
            style={styles.deleteIcon}
            color="tomato"
            name="trash-outline"
            size={20}
            onPress={() => {
              setImage((imgs) => imgs.filter((image) => image !== imgUri));
            }}
          />
        </View>
      </>
    );
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage((imgs) => [...imgs, result.assets[0].uri]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _imageSelectButton = () => {
    return (
      <Pressable style={styles.pickImageContainer} onPress={() => pickImage()}>
        <Ionicons name="image-outline" size={24} color={"tomato"} />
        <Text
          variant="titleSmall"
          style={{ color: "tomato", marginLeft: horizontalScale(10) }}
        >
          Please pick an image from your library
        </Text>
      </Pressable>
    );
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {textInputs.map((input, index) => (
        <View key={index}>
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

      {_imageSelectButton()}

      <View style={{ height: "10%", marginBottom: verticalScale(20) }}>
        <FlashList
          estimatedItemSize={100}
          data={images}
          numColumns={2}
          renderItem={({ item }) => {
            return <ImageItem imgUri={item} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
// https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/User%2FrVs5B9Qh2iM6qODCbR8AuzmIxHI2%2Fprofile%2FprofilePicture.jpg?alt=media&token=aa7e31cd-0606-4e8f-8391-7ff0f8f64588
export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: moderateScale(20),
  },

  titleForInput: {
    color: COLORS.darkBlue,
    marginBottom: verticalScale(10),
    fontWeight: "bold",
  },
  addBtnContainer: {
    marginHorizontal: moderateScale(50),
    marginBottom: verticalScale(50),
  },

  imageContainer: {
    width: moderateScale(170),
    height: moderateScale(120),
    marginBottom: verticalScale(20),
  },

  recipeImage: { flex: 1, width: "100%", height: "100%", borderRadius: 10 },
  deleteIcon: {
    backgroundColor: "#fff",
    position: "absolute",
    padding: moderateScale(4),
    right: moderateScale(5),
    top: moderateScale(5),
    borderRadius: 100,
  },

  pickImageContainer: {
    borderColor: "tomato",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // width: "55%",
    padding: moderateScale(10),
    marginBottom: verticalScale(30),
    marginTop: verticalScale(10),
  },
});
