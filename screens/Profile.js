import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, TEXTS } from "../constants";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { currentUserSnap } from "../hooks/getCurrentUserSnap";
import UserAvatar from "../components/UserAvatar";
import { useMyCustomHook, useSnapperino } from "../hooks/tex";
import { useUserContext } from "../hooks/UserContext";
import RoundedButton from "../components/Buttons/RoundedButton";
import { useAuth } from "../hooks/useAuth";
import { SegmentedButtons } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  getCollectionByField,
  getCollectionByFieldInArray,
  getFavorites,
  manageFollow,
  onSnap,
  updateField,
} from "../utils/firebaseConfig";
import { Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { arrayRemove, arrayUnion, increment } from "firebase/firestore";
import CustomSnackbar from "../components/Buttons/Alert/CustomSnackbar";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Navigation/Header";

const Profile = ({ route, navigation }) => {
  // const snap = currentUserSnap();
  // const { userSnap, setuserSnap } = useUserContext();

  const user = useAuth();
  const { userSnap } = route.params;
  const [data, setData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [value, setValue] = useState("myRecipes");
  const [isFollowing, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [snackbarAttr, setSnacbakAttr] = useState({});

  useEffect(() => {
    navigation.setOptions({ title: userSnap.username.slice(0, 16) });
    if (data.length === 0) {
      console.log("girdi");
      // onSnap("post", "uid", userSnap.uid, setData);
      getCollectionByFieldInArray("post", "uid", userSnap.uid).then((data) => {
        setData(data);
        currentUserSnap().following.includes(userSnap.uid)
          ? setFollowing(true)
          : setFollowing(false);
        setFollowerCount(userSnap.followers);
      });
      if (userSnap.favorites.length > 0) {
        getFavorites(userSnap.favorites).then((favs) => setFavData(favs));
      }
    }
  }, [userSnap.username]);

  const about = [
    {
      id: 1,
      data: userSnap.numberOfPosts,
      text: "Recipe",
    },
    {
      id: 2,
      data: followerCount, //userSnap.followers,
      text: "Followers",
    },
    {
      id: 3,
      data: userSnap.following.length,
      text: "Following",
    },
  ];

  const Item = ({ image, title, itemSnap }) => {
    let ratingOfTheItem = 0;
    if (itemSnap.rating) {
      itemSnap.rating.map((e) => {
        ratingOfTheItem += e.number;
      });
      ratingOfTheItem /= itemSnap.rating.length;
    }
    return (
      <Pressable
        style={{
          marginTop: verticalScale(20),
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.push("RecipePage", {
            snap: itemSnap,
            rating: ratingOfTheItem,
          });
        }}
      >
        <Image
          resizeMode="stretch"
          // source={{ uri: image }}
          source={{ uri: image }}
          style={{
            flex: 1,
            width: 150,
            height: 130,
            borderRadius: 20,
          }}
        />
        <Text style={[TEXTS.titleText3, { marginTop: verticalScale(5) }]}>
          {title}
        </Text>
      </Pressable>
    );
  };

  const _manageFollow = (followingUid, followerUid, incrementValue) => {
    updateField("User", followingUid, {
      following:
        incrementValue === 1
          ? arrayUnion(followerUid)
          : arrayRemove(followerUid),
    }).then(() => {
      if (incrementValue === 1) {
        setFollowing(true);
        setFollowerCount(followerCount + 1);
      } else {
        setFollowing(false);
        setFollowerCount(followerCount - 1);
      }
      updateField("User", followerUid, {
        followers: increment(incrementValue),
      });
    });
  };

  const _handleButton = () => {
    if (user.user?.uid === userSnap.uid) {
      navigation.push("Edit", {
        userSnap: userSnap,
      });
    } else if (!isFollowing) {
      _manageFollow(user.user.uid, userSnap.uid, 1);
      setSnacbakAttr({
        visible: true,
        text: "Followed " + userSnap.username.slice(0, 16),
      });
    } else {
      _manageFollow(user.user.uid, userSnap.uid, -1);
      setSnacbakAttr({
        visible: true,
        text: "Unfollowed " + userSnap.username.slice(0, 16),
      });
    }
  };

  const _flatList = (snap) => {
    return (
      <View style={styles.flatListContainer}>
        <FlashList
          estimatedItemSize={149}
          // data={snap}
          data={snap.sort((a, b) => a.timestamp - b.timestamp)}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{ marginRight: horizontalScale(-10) }}>
              <Item
                image={item.coverImagePath}
                title={item.title}
                itemSnap={item}
              />
            </View>
          )}
          keyExtractor={(item) => item.documentId}
        />
      </View>
    );
  };

  const _handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        handlePress={_handleBackButton}
        color="black"
        headerTitle={userSnap.username}
      />

      <View style={{ padding: moderateScale(20) }}>
        {/* pp */}
        <View style={{ flexDirection: "row" }}>
          <UserAvatar
            image={userSnap.photoUrl}
            width={85}
            height={85}
            position={"flex-start"}
            marginLeft={0}
          />
          <View
            style={{
              padding: moderateScale(5),
              marginLeft: horizontalScale(10),
            }}
          >
            <Text
              style={[
                TEXTS.titleText2,
                { fontSize: moderateScale(18), marginLeft: 0, marginTop: 0 },
              ]}
            >
              {userSnap.username.slice(0, 16)}
            </Text>

            <View style={styles.userStatContainer}>
              {about.map((value) => {
                return (
                  <View
                    key={value.id}
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text style={TEXTS.ppAbout}>{value.data}</Text>
                    <Text style={[TEXTS.ppAbout, { color: COLORS.grey }]}>
                      {value.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        {/* about */}
        <View style={styles.userAboutSection}>
          <Text style={TEXTS.infoText}>{userSnap.about}</Text>
        </View>

        <View style={styles.editButton}>
          <RoundedButton
            text={
              user.user?.uid === userSnap.uid
                ? "Edit"
                : isFollowing
                ? "Unfollow"
                : "Follow"
            }
            buttonOnPress={_handleButton}
          />
        </View>

        <SegmentedButtons
          style={{
            marginTop: verticalScale(20),
          }}
          color={"black"}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "myRecipes",
              label: "My Recipes",
              icon: "chef-hat",
              checkedColor: "tomato",
              style: { backgroundColor: "transparent" },
            },
            {
              value: "bookmark",
              label: "Bookmark",
              icon: "bookmark-outline",
              checkedColor: "tomato",
              style: { backgroundColor: "transparent" },
            },
          ]}
        />
      </View>

      {value === "myRecipes" ? _flatList(data) : _flatList(favData)}

      <View>
        <CustomSnackbar snackbarAttr={snackbarAttr} setter={setSnacbakAttr} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  userStatContainer: {
    flexDirection: "row",
    gap: moderateScale(20),
    marginLeft: horizontalScale(-5),
  },
  userAboutSection: {
    marginTop: verticalScale(20),
    justifyContent: "center",
    alignItems: "flex-start",
  },

  editButton: {
    height: moderateScale(55),
    width: moderateScale(150),
  },

  flatListContainer: {
    flex: 1,
    marginLeft: horizontalScale(30),
    marginTop: verticalScale(-20),
  },
});
