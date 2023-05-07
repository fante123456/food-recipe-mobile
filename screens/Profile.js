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
  getCollectionByFieldInArray,
  getFavorites,
  onSnap,
} from "../utils/firebaseConfig";
import { Image } from "react-native";
import { FlashList } from "@shopify/flash-list";

const Profile = ({ route, navigation }) => {
  // const snap = currentUserSnap();
  const { snap } = route.params;
  const { userSnapTest } = useUserContext();
  const [data, setData] = useState([]);
  const [favData, setFavData] = useState([]);
  if (snap !== null) {
    userSnapTest = snap;
  }

  const [value, setValue] = useState("myRecipes");

  const user = useAuth();

  const about = [
    {
      id: 1,
      data: userSnapTest.numberOfPosts,
      text: "Recipe",
    },
    {
      id: 2,
      data: userSnapTest.followers,
      text: "Followers",
    },
    {
      id: 3,
      data: userSnapTest.following.length,
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
  useEffect(() => {
    navigation.setOptions({ title: userSnapTest.username });
    if (data.length === 0) {
      console.log("girdi");
      // onSnap("post", "uid", userSnapTest.uid, setData);
      getCollectionByFieldInArray("post", "uid", userSnapTest.uid).then(
        (data) => setData(data)
      );
      getFavorites(userSnapTest.favorites).then((favs) => setFavData(favs));
    }
  }, [userSnapTest.username]);

  const _handleButton = () => {
    console.log("edit button");
  };

  const _flatList = (snap) => {
    return (
      <View style={styles.flatListContainer}>
        <FlatList
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
  return (
    <View style={styles.container}>
      <View style={{ padding: moderateScale(20) }}>
        {/* pp */}
        <View style={{ flexDirection: "row" }}>
          <UserAvatar
            image={userSnapTest.photoUrl}
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
              {userSnapTest.username}
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
          <Text style={TEXTS.infoText}>{userSnapTest.about}</Text>
        </View>

        <View style={styles.editButton}>
          <RoundedButton
            text={user.user?.uid === userSnapTest.uid ? "Edit" : "Follow"}
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
    </View>
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
