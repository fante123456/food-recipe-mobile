import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { Image } from "react-native";
import { hideBottomNavBar } from "../hooks/hideBottomNavBar";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { COLORS, TEXTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { currentUserSnap } from "../hooks/getCurrentUserSnap";

const Comments = ({ route, navigation }) => {
  hideBottomNavBar(navigation);
  const { postSnap } = route.params;
  const [commentSnapshot, setCommentSnapShot] = useState([]);
  const userSnap = currentUserSnap();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (commentSnapshot.length === 0) {
      _getData();
      console.log(userSnap);
    }
  }, []);

  const _getData = async () => {
    // `post/${postSnap.documentId}/comment`

    const q = query(
      collection(db, `post/${postSnap.documentId}/comment`),
      orderBy("time", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];

      querySnapshot.forEach((doc) => {
        // console.log(doc.id); // comment doc id
        // setCommentSnapShot((commentSnap) => [...commentSnap, doc.data()]);
        comments.push(doc.data());
        setLoad(true);
      });
      setCommentSnapShot(comments);
    });
  };

  const _submitComment = async (comment) => {
    const commentRef = collection(db, `post/${postSnap.documentId}/comment`);
    await addDoc(commentRef, {
      uid: userSnap.uid,
      comment: comment,
      time: serverTimestamp(),
      username: userSnap.username,
      photoUrl: userSnap.photoUrl,
    });
  };

  const defImage =
    "https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/Defaults%2FdefaultAvatar.png?alt=media&token=aac8b48a-2ce0-4313-8758-662598700004";

  const Item = ({ username, comment, image, time }) => {
    console.log(time, comment);
    // let date;
    // try {
    //   date =
    //     time.toDate().toDateString() +
    //     " " +
    //     time.toDate().toLocaleTimeString("tr-TR");
    // } catch (error) {
    //   console.log(error);
    // }
    const dateK = time.toDate();
    const formatter = new Intl.DateTimeFormat("tr", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = formatter.format(dateK);

    return (
      <Pressable activeOpacity={0.8} onPress={() => {}}>
        <View
          style={{
            padding: moderateScale(10),
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.categoryStyle}>
            <View
              style={{
                height: 55,
              }}
            >
              <Image
                resizeMode="stretch"
                // source={{ uri: image }}
                source={{ uri: image }}
                style={{
                  flex: 1,
                  width: 55,
                  borderRadius: 30,
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={[
                    TEXTS.titleText3,
                    {
                      width: "auto",
                      lineHeight: moderateScale(20),
                    },
                  ]}
                >
                  {username.slice(0, 12)}
                </Text>
                <Text>{date}</Text>
              </View>

              <Text style={[TEXTS.infoText, { marginTop: verticalScale(15) }]}>
                {comment}
              </Text>
              {/* <Text style={styles.recipeTitle}>{title}</Text> */}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  renderSeparatorView = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        ItemSeparatorComponent={this.renderSeparatorView}
        showsHorizontalScrollIndicator={false}
        scrool
        data={commentSnapshot}
        renderItem={({ item }) => {
          return (
            <Item
              username={item.username}
              comment={item.comment}
              image={item.photoUrl}
              time={item.time}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          bottom: 0,
          left: 0,
          right: 0,
          borderWidth: 1,
          borderColor: COLORS.transparentBlack1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: horizontalScale(10),
            borderWidth: 2,
            borderRadius: 30,
            borderColor: COLORS.transparentBlack1,
            margin: moderateScale(20),
            justifyContent: "space-between",
          }}
        >
          <CustomTextInput _submitComment={_submitComment} />
          <Pressable
            onPress={() => {
              _submitComment();
            }}
          >
            <Ionicons name="send-outline" size={20} color={"tomato"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

//Textinput separate component
const CustomTextInput = ({ _submitComment }) => {
  const [value, setValue] = useState("");

  return (
    <TextInput
      placeholder="Write your comment."
      selectionColor={COLORS.transparentBlack5}
      style={styles.text}
      onChangeText={(text) => setValue(text)}
      value={value}
      onSubmitEditing={(event) => _submitComment(event.nativeEvent.text)}
    />
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: horizontalScale(5),
    gap: moderateScale(25),
  },
  separator: { height: 1, width: "100%", backgroundColor: "#DEE2E5" },
  text: {
    marginLeft: moderateScale(8),
    color: COLORS.transparentBlack5,
  },
});
