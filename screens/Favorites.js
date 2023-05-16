import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  db,
  getCollectionByField,
  getFavorites,
  onSnap,
  updateField,
} from "../utils/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import HudView from "../components/HudView";
import {
  collection,
  query,
  where,
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { setFav } from "../hooks/favs";
import { TEXTS } from "../constants";
import { useUserContext } from "../hooks/UserContext";

const Favorites = () => {
  const { userSnapTest, setUserSnapTest } = useUserContext();
  const navigation = useNavigation();
  const user = useAuth();
  const [snap, setSnap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testSnap, setTestSnap] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    if (user.user !== undefined && isFocused) {
      _getData(user.user.uid);
    }
    // if (Object.keys(snap).length !== 0) {
    //   setLoading(false);
    // }
  }, [user.user, isFocused]);

  // useEffect(() => {
  //   if (Object.keys(testSnap).length > 0) {
  //     console.log("cik");
  //     navigation.push("Profile", {
  //       userSnap: testSnap[0],
  //     });
  //     setLoading(false);
  //   }
  // }, [testSnap]);

  const _getData = (uid) => {
    const userRef = collection(db, "User");
    const q = query(userRef, where("uid", "==", user.user.uid));
    let data = [];
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().favorites.length > 0) {
          getFavorites(doc.data().favorites).then((values) => {
            setSnap(values);
            setFav(values);
          });
        }
      });
      setLoading(false);
    });

    // unsubscribe(); //?
  };

  const createTwoButtonAlert = (favoriteId) => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to permanently delete the recipe from your favorites?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            updateField("User", user.user.uid, {
              favorites: arrayRemove(favoriteId),
            }),
        },
      ]
    );
  };

  const Item = ({ image, title, itemSnap, rating }) => {
    let addedBy =
      itemSnap.uid !== "admin" ? itemSnap.addedBy.slice(0, 16) : "admin";
    let ratingOfTheItem = 0;
    if (rating) {
      rating.map((e) => {
        ratingOfTheItem += e.number;
      });
      ratingOfTheItem /= itemSnap.rating.length;
    }
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.push("RecipePage", {
                snap: itemSnap,
                rating: ratingOfTheItem,
              });
            }}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </Pressable>

          <View style={styles.info}>
            <View style={styles.titleSection}>
              <Text style={TEXTS.favoriteCardTitle}>{title}</Text>
              <Pressable
                onPress={() => createTwoButtonAlert(itemSnap.documentId)}
              >
                <Ionicons name="ellipsis-vertical" size={20} />
              </Pressable>
            </View>

            <View style={{ marginTop: verticalScale(25) }}>
              <Pressable
                onPress={
                  addedBy !== "admin"
                    ? () => {
                        setLoading(true);

                        // onSnap("User", "uid", itemSnap.addedBy, setTestSnap);

                        getCollectionByField(
                          "User",
                          "uid",
                          itemSnap.addedBy
                        ).then((userSnap) => {
                          navigation.push("Profile", { userSnap: userSnap });
                        });
                      }
                    : null
                }
              >
                <Text>{addedBy}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: -25 }}>
        {loading ? (
          <View>
            <HudView />
          </View>
        ) : null}

        {user.user ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            scrool
            data={snap} // 4 tane var see all ile hepsini goster !
            renderItem={({ item }) => {
              return (
                <Item
                  image={item.coverImagePath}
                  title={item.title}
                  itemSnap={item}
                  rating={item.rating}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>Please Sign in</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  cardContainer: {
    padding: moderateScale(10),
  },

  card: {
    height: moderateScale(125),
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  imageContainer: { height: "100%", width: "50%" },
  image: {
    resizeMode: "stretch",
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info: {
    padding: moderateScale(10),
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
