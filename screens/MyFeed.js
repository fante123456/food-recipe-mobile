import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "../Metrics";
import { COLORS, TEXTS } from "../constants";
import { FlatList } from "react-native-gesture-handler";
import { currentUserSnap } from "../hooks/getCurrentUserSnap";
import { getCollectionByField, getPosts } from "../utils/firebaseConfig";
import HudView from "../components/HudView";

const MyFeed = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [snap, setSnap] = useState([]);
  const [posts, setPost] = useState([]);

  const _getPosts = async () => {
    const promises = currentUserSnap().following.map(async (followedUser) => {
      const data = await getCollectionByField("User", "uid", followedUser);
      return data.post.flat();
    });

    const results = await Promise.all(promises);
    setPost((old) => [...old, ...results.flat()]);
  };

  useEffect(() => {
    setSnap([]);
    setLoading(true);

    _getPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      _getPostData = async () => {
        let _posts = await getPosts(posts);
        setSnap(_posts);
        setLoading(false);
      };
      _getPostData();
    }
  }, [posts]);

  const Item = ({ image, title, itemSnap, rating }) => {
    let date;
    try {
      const dateK = itemSnap.timestamp.toDate();
      const formatter = new Intl.DateTimeFormat("tr", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      date = formatter.format(dateK);
    } catch (error) {}

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
              console.log(itemSnap);
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
              {/* <Pressable
                onPress={() => createTwoButtonAlert(itemSnap.documentId)}
              >
                <Ionicons name="ellipsis-vertical" size={20} />
              </Pressable> */}
              <Text style={{ color: COLORS.grey }}>{date}</Text>
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
      <View>
        {loading ? (
          <View>
            <HudView />
          </View>
        ) : null}

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
      </View>
    </SafeAreaView>
  );
};

export default MyFeed;

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
    justifyContent: "center",
  },
});
