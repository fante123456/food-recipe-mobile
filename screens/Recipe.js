import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, TEXTS } from "../constants";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import ExpandableIconCard from "../components/ExpandableIconCard";
import { useAuth } from "../hooks/useAuth";
import { getFav, getStatus } from "../hooks/favs";
import {
  getCollectionByField,
  onSnap,
  updateField,
} from "../utils/firebaseConfig";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { hideBottomNavBar } from "../hooks/hideBottomNavBar";
import CustomSnackbar from "../components/Buttons/Alert/CustomSnackbar";
import Rating from "../components/Rating";
import { useNavigation } from "@react-navigation/native";
import { currentUserSnap } from "../hooks/getCurrentUserSnap";
import { Animated } from "react-native";
import UserAvatar from "../components/UserAvatar";
import { useUserContext } from "../hooks/UserContext";

const Recipe = ({ route, navigation }) => {
  const { snap, rating } = route.params;
  const [recipeOwner, setRecipeOwner] = useState({});
  const [bookmark, setBookmarkColor] = useState(COLORS.inActiveBookmarkColor);
  const [visible, setVisible] = useState(false);
  const [snackbarAttr, setSnacbakAttr] = useState({});
  const [showRating, setShowRating] = useState(false);
  const [rat, setRat] = useState(rating);
  const [sumRating, setSumRating] = useState(0);
  const user = useAuth();
  const { userSnapTest, setUserSnapTest } = useUserContext();

  useEffect(() => {
    if (getStatus() && user.user === undefined) {
      let fav = getFav();
      fav.map((value) => {
        if (value.documentId === snap.documentId) {
          setBookmarkColor(COLORS.activeBookmarkColor);
        }
      });
    } else if (!getStatus() && user.user !== undefined) {
      _getFavsFromDatabase();
    }

    if (Object.keys(recipeOwner).length === 0 && snap) {
      _getRecipeOwner();
    }
  }, [user.user]);

  const _getFavsFromDatabase = () => {
    getCollectionByField("User", "uid", user.user.uid).then((favArray) => {
      if (favArray.favorites.includes(snap.documentId)) {
        setBookmarkColor(COLORS.activeBookmarkColor);
      }
    });
  };

  const _handleBookmarkButton = () => {
    setVisible(true);
    if (bookmark === COLORS.inActiveBookmarkColor) {
      setSnacbakAttr({
        visible: true,
        text: "Recipe added to your favorites.",
      });
      updateField("User", user.user.uid, {
        favorites: arrayUnion(snap.documentId),
      });
      setBookmarkColor(COLORS.activeBookmarkColor);
    } else {
      setSnacbakAttr({
        visible: true,
        text: "Recipe removed from your favorites.",
      });
      updateField("User", user.user.uid, {
        favorites: arrayRemove(snap.documentId),
      });
      setBookmarkColor(COLORS.inActiveBookmarkColor);
    }
  };

  const _topLinear = () => {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: 100,
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,.8)", "transparent"]}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
    );
  };

  const _calculateRatingSum = () => {
    let ratingOfTheItem = 0;
    snap.rating?.map((e) => {
      ratingOfTheItem += e.number;
    });
    setSumRating(ratingOfTheItem);
  };
  const _checkRatedUsers = () =>
    snap.rating?.some((obj) => obj.ratedBy === currentUserSnap().uid);

  const _getRecipeOwner = () => {
    onSnap("User", "uid", snap.uid, setRecipeOwner);
    // getCollectionByField("User", "uid", snap.uid).then((data) =>
    //   setRecipeOwner(data)
    // );
  };
  const recipeInfo = () => {
    return (
      <View style={styles.recipeCardContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            marginHorizontal: horizontalScale(15),
          }}
        >
          <View>
            <Text
              style={{ ...TEXTS.titleText3, marginBottom: verticalScale(5) }}
            >
              {snap.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              {snap.uid !== "admin" && Object.keys(recipeOwner).length > 0 ? (
                <Pressable
                  style={styles.userAvatar}
                  onPress={() => {
                    navigation.push("Profile", { userSnap: recipeOwner[0] });
                  }}
                >
                  <UserAvatar
                    image={recipeOwner[0].photoUrl}
                    width={30}
                    height={30}
                    position={"flex-start"}
                    marginLeft={0}
                  />
                  <Text>{recipeOwner[0].username.slice(0, 16)} </Text>
                </Pressable>
              ) : (
                <Text>Admin</Text>
              )}
              <Pressable
                onPress={() => {
                  if (!_checkRatedUsers()) {
                    _calculateRatingSum();
                    setShowRating(true);
                    navigation.getParent("tabs").setOptions({
                      tabBarStyle: {
                        backgroundColor: "black",
                      },
                    });
                  } else {
                    setVisible(true);

                    setSnacbakAttr({
                      visible: true,
                      text: "You already rated this recipe.",
                    });
                  }
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  marginLeft: horizontalScale(15),
                }}
              >
                <Octicons name="star-fill" size={15} color="#FCC806" />
                <Text style={{}}>
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 1,
                  }).format(rat)}
                </Text>
              </Pressable>
            </View>
          </View>

          <Ionicons
            name="bookmark"
            size={24}
            color={bookmark}
            onPress={_handleBookmarkButton}
          />
        </View>
      </View>
    );
  };
  const expandableIconCard = [
    {
      icon: <Ionicons name="information-circle-outline" size={24} />,
      title: "Brief",
      content: Array.isArray(snap.brief)
        ? snap.brief
        : snap.brief.replace(/(<([^>]+)>)/gi, ""),
    },
    {
      icon: <Ionicons name="reader-outline" size={24} />,
      title: "Instructions",
      content: Array.isArray(snap.instruction)
        ? snap.instruction
        : snap.instruction.replace(/(<([^>]+)>)/gi, ""),
    },
    {
      icon: <MaterialCommunityIcons name="bowl-mix-outline" size={24} />,
      title: "Ingredients",
      content: snap.ingredient,
      uid: snap.uid,
    },
  ];

  const _header = () => {
    return (
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#fff" />
        </Pressable>
        <Text
          style={{
            color: "#fff",
            fontSize: moderateScale(17),
          }}
        >
          Recipe Details
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {_header()}

      {showRating ? (
        <Rating
          snap={snap}
          navigation={navigation}
          setShowRating={setShowRating}
          setRat={setRat}
          sumRating={sumRating}
          length={snap.rating ? snap.rating.length : 1}
          documentId={snap.documentId}
        />
      ) : null}

      {/* <ImageBackground
        style={styles.image}
        source={{ uri: snap.coverImagePath }}
        resizeMode="cover"
      /> */}
      <View style={{ height: moderateScale(280) }}>
        <ImageBackground
          style={{ flex: 1 }}
          source={{ uri: snap.coverImagePath }}
          resizeMode="stretch"
        />
      </View>
      {_topLinear()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.recipeInfoContainer}>
          {recipeInfo()}
          {expandableIconCard.map((details, index) => (
            <ExpandableIconCard {...details} key={index} />
          ))}

          <Pressable
            style={styles.commnetBtnContainer}
            onPress={() => {
              navigation.push("Comments", {
                postSnap: snap,
              });
            }}
          >
            <View
              style={{
                padding: moderateScale(12),
                alignSelf: "center",
              }}
            >
              <Text style={styles.commentBtnTitle}>See comments</Text>
            </View>
          </Pressable>
        </View>
        {visible ? (
          <CustomSnackbar snackbarAttr={snackbarAttr} setter={setSnacbakAttr} />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    width: "100%",
    zIndex: 11,
    marginTop: verticalScale(15),
    padding: moderateScale(10),
    alignItems: "center",
    flexDirection: "row",
    gap: verticalScale(20),
  },
  scrollView: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: { backgroundColor: "#fff", flex: 1 },
  image: {
    width: "100%",
    height: moderateScale(280),
  },

  recipeInfoContainer: {
    flex: 1,
    padding: moderateScale(20),
    // marginTop: verticalScale(-72),
    marginTop: verticalScale(265),
  },

  recipeCardContainer: {
    marginBottom: verticalScale(15),
    width: "100%",
    height: moderateScale(80),
    backgroundColor: "#fff",
    borderRadius: moderateScale(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  commnetBtnContainer: {
    flex: 1,
    borderRadius: moderateScale(15),
    backgroundColor: "tomato",
    height: "100%",
    marginBottom: verticalScale(15),
  },
  commentBtnTitle: {
    fontSize: moderateScale(15),
    color: "#fff",
    fontWeight: "bold",
  },
  userAvatar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(10),
    marginTop: verticalScale(5),
  },
});
