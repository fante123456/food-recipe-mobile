import { StyleSheet, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
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
import {
  arrayRemove,
  arrayUnion,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { setCollection, storage, updateField } from "../utils/firebaseConfig";
import CustomSnackbar from "../components/Buttons/Alert/CustomSnackbar";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import HudView from "../components/HudView";
import { useIsFocused } from "@react-navigation/native";
import Header from "../components/Navigation/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const AddRecipe = ({ route, navigation }) => {
  const { editPostSnap } = route.params ? route.params : {};
  // const user = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(
    editPostSnap
      ? {
          title: editPostSnap.title,
          brief: editPostSnap.brief,
          instructions: editPostSnap.instruction,
          ingredients: editPostSnap.ingredient.map((val) => val).join("\n"),
          cooktime: editPostSnap.requierements.cookTime,
          serve: editPostSnap.requierements.serve,
          preparationtime: editPostSnap.requierements.prepTime,
        }
      : {
          title: "",
          brief: "",
          instructions: "",
          ingredients: "",
          cooktime: "",
          serve: "",
          preparationtime: "",
        }
  );

  const updateFormField = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };
  const [snackbarAttr, setSnacbakAttr] = useState({});

  const [images, setImage] = useState(
    editPostSnap ? [editPostSnap.coverImagePath, ...editPostSnap.filePaths] : []
  );

  const [editLength, setEditLength] = useState(
    editPostSnap ? editPostSnap.filePaths.length + 1 : 0
  );

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
      value: formData.title,
    },
    {
      title: "Brief",
      placeholder: "Recipe brief.",
      multiline: true,
      maxLength: 500,
      ...textInputConstants,

      value: formData.brief,
    },
    {
      title: "Instructions",
      placeholder: "Write your instructions",
      multiline: true,
      maxLength: 450,
      ...textInputConstants,
      value: formData.instructions,
    },
    {
      title: "Ingredients",
      placeholder: "Write your instructions one under another.",
      multiline: true,
      maxLength: 400,
      ...textInputConstants,
      value: formData.ingredients,
    },
    {
      title: "Preparation Time",
      placeholder: "Preparation time as minute",
      maxLength: 15,
      keyboardType: "numeric",
      ...textInputConstants,
      value: formData.preparationtime,
    },
    {
      title: "Cook Time",
      placeholder: "Cook time for recipe as minute.",
      maxLength: 15,
      keyboardType: "numeric",
      ...textInputConstants,
      value: formData.cooktime,
    },
    {
      title: "Serve",
      placeholder: "Serve for how many people?",
      maxLength: 15,
      keyboardType: "numeric",
      ...textInputConstants,
      value: formData.serve,
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
          Your first image will be recipe cover image.
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
          cookTime: formData.cooktime,
          prepTime: formData.preparationtime,
          serve: formData.serve,
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

  const _deleteImageFromStorage = async (imageName) => {
    const strRef = ref(
      storage,
      `User/${currentUserSnap().uid}/post/${
        editPostSnap.documentId
      }/${imageName}.jpg`
    );

    deleteObject(strRef)
      .then(() => {
        console.log("deleted succesfully");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const _handleEditButton = async () => {
    if (images.length > 0) {
      updateField("post", editPostSnap.documentId, {
        filePaths: [],
      });
      images.map(async (img, index) => {
        const response = await fetch(img);
        const blob = await response.blob();
        try {
          let imageName = "";
          if (index === 0) {
            imageName = "coverImage.jpg";
          } else {
            imageName = index + ".jpg";
          }

          const storageRef = ref(
            storage,
            `User/${currentUserSnap().uid}/post/${
              editPostSnap.documentId
            }/${imageName}`
          );

          await uploadBytes(storageRef, blob, {
            contentType: "image/jpeg",
          });

          getDownloadURL(storageRef).then((downloadURL) => {
            if (index === 0) {
              updateField("post", editPostSnap.documentId, {
                coverImagePath: downloadURL,
                ...(images.length === 1 && { filePaths: [] }),
              });
            } else {
              updateField("post", editPostSnap.documentId, {
                filePaths: arrayUnion(downloadURL),
              });
            }
            setLoading(false);
          });
        } catch (error) {
          console.error("Error updating image:", error);
        }
      });
      updateField("post", editPostSnap.documentId, {
        documentId: editPostSnap.documentId,
        brief: formData.brief,
        ingredient: formData.ingredients.split("\n"),
        instruction: formData.instructions,
        title: formData.title,
        requierements: {
          cookTime: formData.cooktime,
          prepTime: formData.preparationtime,
          serve: formData.serve,
        },
      }).then(() => {
        setLoading(false);
      });

      setLoading(true);

      //delete the older image(s)
      for (let i = images.length; i < images.length + 1; i++) {
        console.log("endless looopp");
        const imageName = i;

        const deleted = await _deleteImageFromStorage(imageName);
        if (deleted) {
          console.log("Image deleted successfully");
        } else {
          console.log("not found in the storage");
        }
      }
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
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header
        handlePress={() => navigation.goBack()}
        color="black"
        headerTitle="Add Recipe"
      />
      {loading ? <HudView /> : null}

      <KeyboardAwareScrollView style={styles.container}>
        {textInputs.map((input, index) => (
          <View key={index}>
            <Text variant="headlineSmall" style={styles.titleForInput}>
              {input.title}
            </Text>
            <TextInput
              {...textInputStyle}
              {...input}
              // onChangeText={(val) => input.setter(val)}
              onChangeText={(val) => {
                updateFormField(
                  input.title.replace(" ", "").toLowerCase(),
                  val
                );
              }}
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
            <RoundedButton
              mt={0}
              text={editPostSnap ? "Update" : "Add"}
              buttonOnPress={
                editPostSnap ? _handleEditButton : _handleAddButton
              }
            />
          </View>
        </View>

        {snackbarAttr.visible === true ? (
          <View style={styles.snackbarContainer}>
            <CustomSnackbar
              snackbarAttr={snackbarAttr}
              setter={setSnacbakAttr}
            />
          </View>
        ) : null}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
// https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/User%2FrVs5B9Qh2iM6qODCbR8AuzmIxHI2%2Fprofile%2FprofilePicture.jpg?alt=media&token=aa7e31cd-0606-4e8f-8391-7ff0f8f64588
export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: moderateScale(20),
    flex: 1,
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
