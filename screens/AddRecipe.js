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
import { useAuth } from "../hooks/useAuth";
import { currentUserSnap } from "../hooks/getCurrentUserSnap";
import { arrayUnion, increment, serverTimestamp } from "firebase/firestore";
import { setCollection, storage, updateField } from "../utils/firebaseConfig";
import CustomSnackbar from "../components/Buttons/Alert/CustomSnackbar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import HudView from "../components/HudView";

const AddRecipe = () => {
  // const user = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    brief: "",
    instructions: "",
    ingredients: "",
    cooktime: "",
    serve: "",
    preparationtime: "",
  });

  const updateFormField = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };
  const [snackbarAttr, setSnacbakAttr] = useState({});

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
    {
      title: "Title",
      placeholder: "Title of your recipe.",
      multiline: false,
      maxLength: 50,
      ...textInputConstants,
    },
    {
      title: "Brief",
      placeholder: "Recipe brief.",
      multiline: true,
      maxLength: 500,

      ...textInputConstants,
    },
    {
      title: "Instructions",
      placeholder: "Write your instructions",
      multiline: true,
      maxLength: 450,
      ...textInputConstants,
    },
    {
      title: "Ingredients",
      placeholder: "Write your instructions one under another.",
      multiline: true,
      maxLength: 400,
      ...textInputConstants,
    },
    {
      title: "Preparation Time",
      placeholder: "Preparation time as minute",
      maxLength: 15,
      keyboardType: "numeric",
      ...textInputConstants,
    },
    {
      title: "Cook Time",
      placeholder: "Cook time for recipe as minute.",
      maxLength: 15,
      keyboardType: "numeric",
      ...textInputConstants,
    },
    {
      title: "Serve",
      placeholder: "Serve for how many people?",
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
          Please pick an image from your library.{"\n"}
          Your first image will be cover image.
        </Text>
      </Pressable>
    );
  };

  const _handleAddButton = async () => {
    if (images.length > 0) {
      setLoading(true);
      const documentId = await setCollection("post", {
        brief: formData.brief,
        ingredient: formData.ingredients.split("\n"),
        instruction: formData.instructions,
        title: formData.title,
        requierements: {
          cooktime: formData.cooktime,
          prepTime: formData.preparationtime,
          servers: formData.serve,
        },
        uid: currentUserSnap().uid,
        coverImagePath: "",
        filePaths: [],
        documentId: "",
        addedBy: currentUserSnap().username,
        timestamp: serverTimestamp(),
        userPhoto: currentUserSnap().photoUrl,
      });

      images.map(async (img, index) => {
        let imageName = "";
        const response = await fetch(img);
        const blob = await response.blob();
        if (index === 0) {
          imageName = "coverImage.jpg";
        } else {
          imageName = index + ".jpg";
        }
        const storageRef = ref(
          storage,
          `User/${currentUserSnap().uid}/post/${documentId}/${imageName}`
        );

        await uploadBytes(storageRef, blob);
        getDownloadURL(storageRef).then((downloadURL) => {
          updateField("post", documentId, {
            documentId: documentId,
            ...(index === 0
              ? { coverImagePath: downloadURL }
              : { filePaths: arrayUnion(downloadURL) }),
          });
          updateField("User", currentUserSnap().uid, {
            numberOfPosts: increment(1),
            post: arrayUnion(documentId),
          }).then(() => {
            setLoading(false);
          });
        });
      });
    } else if (Object.values(formData).every((value) => value === "")) {
      setSnacbakAttr({
        visible: true,
        text: "Please fill the inputs.",
      });
    } else {
      setSnacbakAttr({
        visible: true,
        text: "Please add an image to your recipe",
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {loading ? <HudView /> : null}

      {textInputs.map((input, index) => (
        <View key={index}>
          <Text variant="headlineSmall" style={styles.titleForInput}>
            {input.title}
          </Text>
          <TextInput
            {...textInputStyle}
            {...input}
            // onChangeText={(val) => input.setter(val)}
            onChangeText={(val) =>
              updateFormField(input.title.replace(" ", "").toLowerCase(), val)
            }
          />
        </View>
      ))}
      {_imageSelectButton()}
      <View
        style={{
          height: "10%",
          marginBottom: verticalScale(20),
        }}
      >
        <FlashList
          estimatedItemSize={100}
          data={images}
          numColumns={2}
          renderItem={({ item }) => {
            return <ImageItem imgUri={item} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />

        <View style={styles.addBtn}>
          <RoundedButton mt={0} text="Add" buttonOnPress={_handleAddButton} />
        </View>
      </View>

      {snackbarAttr.visible === true ? (
        <View style={styles.snackbarContainer}>
          <CustomSnackbar snackbarAttr={snackbarAttr} setter={setSnacbakAttr} />
        </View>
      ) : null}
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
    marginBottom: verticalScale(20),
    marginTop: verticalScale(10),
    gap: moderateScale(15),
  },

  addBtn: {
    width: "80%",
    height: moderateScale(40),
    alignSelf: "center",
    marginBottom: verticalScale(50),
  },
  snackbarContainer: {
    position: "absolute",
    bottom: moderateScale(20),
    width: "100%",
  },
});
