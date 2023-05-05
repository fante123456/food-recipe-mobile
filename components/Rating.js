import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { COLORS, TEXTS } from "../constants";
import { Pressable } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { Entypo, Octicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { currentUserSnap } from "../hooks/getCurrentUserSnap";
import { updateField } from "../utils/firebaseConfig";
import { arrayUnion } from "firebase/firestore";

const Rating = (props) => {
  const {
    navigation,
    setShowRating,
    setRat,
    sumRating,
    length,
    documentId,
    snap,
  } = props;
  const [lastClickedIndex, setLastClickedIndex] = useState(-1);

  const _hide = () => {
    setShowRating(false);
    navigation.getParent("tabs").setOptions({ tabBarStyle: {} });
  };
  const _handleSubmit = () => {
    setRat(
      length !== 1
        ? (lastClickedIndex + sumRating) / (length + 1)
        : (lastClickedIndex + sumRating) / length
    );

    //aynı sayfadan cikmaz ise bunu onceden ratelediniz desin diye yapiyorum
    if (snap.rating) {
      snap.rating = [...snap.rating, { ratedBy: currentUserSnap().uid }];
    }

    if (
      updateField("post", documentId, {
        rating: arrayUnion({
          ratedBy: currentUserSnap().uid,
          number: lastClickedIndex,
        }),
      })
    ) {
      _hide();
    }
  };
  const _renderIcons = () => {
    const stars = [];
    for (let index = 1; index <= 5; index++) {
      const filled = index <= lastClickedIndex;
      const name = filled ? "star-fill" : "star";
      stars.push(
        <Octicons
          key={index}
          onPress={() => {
            setLastClickedIndex(index === lastClickedIndex ? -1 : index);
          }}
          name={name}
          size={30}
          color={"#FCC806"}
        />
      );
    }
    return stars;
  };
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        _hide();
      }}
    >
      <TouchableWithoutFeedback>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingContainerHeader}>
            <Text style={[TEXTS.titleText2, { marginLeft: 0 }]}>
              Give Rating To Recipe
            </Text>
            <Entypo
              name="cross"
              size={24}
              color="#172b4d"
              onPress={() => {
                _hide();
              }}
            />
          </View>

          <View style={styles.ratingContainerIcons}>{_renderIcons()}</View>

          <Button
            disabled={lastClickedIndex === -1}
            style={{ marginHorizontal: horizontalScale(30), borderRadius: 12 }}
            buttonColor="#172b4d"
            mode="contained"
            labelStyle={{ fontSize: moderateScale(14), textAlign: "center" }}
            onPress={() => _handleSubmit()}
          >
            Send
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </Pressable>
  );
};
export default Rating;

const styles = StyleSheet.create({
  container: {
    zIndex: 22,
    backgroundColor: COLORS.transparentBlack5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  ratingContainer: {
    backgroundColor: "#fff",
    width: "90%",
    padding: moderateScale(20),
    borderRadius: 5,
  },
  ratingContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainerIcons: {
    flexDirection: "row",
    gap: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(30),
    marginBottom: verticalScale(35),
  },
});
