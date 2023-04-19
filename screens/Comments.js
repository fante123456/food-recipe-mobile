import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { COLORS, TEXTS } from "../constants";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { currentUserSnap } from "../hooks/getCurrentUserSnap";
import { FlashList } from "@shopify/flash-list";
import { updateField } from "../utils/firebaseConfig";
import ReplyComment from "../components/Comment/ReplyComment";
import CommentDeleteAlert from "../components/Buttons/Alert/CommentDeleteAlert";
import HudView from "../components/HudView";
import UserAvatar from "../components/UserAvatar";

const Comments = ({ route, navigation }) => {
  hideBottomNavBar(navigation);
  const { postSnap } = route.params;
  const [commentSnapshot, setCommentSnapShot] = useState([]);
  const userSnap = currentUserSnap();
  const [loading, setLoading] = useState(false);
  const [isReplying, setReplying] = useState(false);
  const [replyValues, setReplyValues] = useState({});

  useEffect(() => {
    if (commentSnapshot.length === 0) {
      _getData();
      // console.log(userSnap);
    }
  }, []);

  const _getData = async () => {
    const q = query(
      collection(db, `post/${postSnap.documentId}/comment`),
      orderBy("time", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];

      querySnapshot.forEach((doc) => {
        // console.log(doc.id); // comment doc id
        // setCommentSnapShot((commentSnap) => [...commentSnap, doc.data()]);

        comments.push({ ...doc.data(), id: doc.id });

        // for (let key in doc.data().reply) {
        //   console.log(doc.data().reply[key].comment);
        // }
      });
      setCommentSnapShot(comments);
      setLoading(true);
    });
  };

  const _submitComment = async (comment) => {
    if (Object.keys(replyValues).length !== 0) {
      const ref = doc(
        db,
        "post",
        `${postSnap.documentId}/comment/${replyValues.commentId}`
      );
      setDoc(
        ref,
        {
          reply: {
            [new Date().getTime()]: {
              uid: userSnap.uid,
              comment: comment,
              time: serverTimestamp(),
              username: userSnap.username,
              photoUrl: userSnap.photoUrl,
            },
          },
        },
        { merge: true }
      );
    } else {
      let path = `post/${postSnap.documentId}/comment`;
      const commentRef = collection(db, path);
      await addDoc(commentRef, {
        uid: userSnap.uid,
        comment: comment,
        time: serverTimestamp(),
        username: userSnap.username,
        photoUrl: userSnap.photoUrl,
      }).then((docRef) => {
        updateField(path, docRef.id, {
          documentId: docRef.id,
        });
      });
    }
  };

  const Item = ({ username, comment, image, time, commentId, itemSnap }) => {
    let date;
    try {
      const dateK = time.toDate();
      const formatter = new Intl.DateTimeFormat("tr", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      date = formatter.format(dateK);
    } catch (error) {}

    return (
      <Pressable activeOpacity={0.8} onPress={() => {}}>
        <View
          style={{
            padding: moderateScale(10),
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.categoryStyle}>
            <UserAvatar
              image={image}
              width={55}
              height={55}
              position={"flex-start"}
            />

            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
              }}
            >
              <View>
                <Text style={TEXTS.titleText3}>{username.slice(0, 14)}</Text>
                <Text style={{ fontSize: moderateScale(12.5), color: "grey" }}>
                  {date}
                </Text>
              </View>

              {currentUserSnap().uid === itemSnap.uid ? (
                <Ionicons
                  color={"tomato"}
                  name="trash-outline"
                  size={18}
                  style={{
                    position: "absolute",
                    right: moderateScale(15),
                    top: moderateScale(10),
                  }}
                  onPress={() =>
                    CommentDeleteAlert(postSnap.documentId, commentId)
                  }
                />
              ) : null}

              <Text
                style={[
                  TEXTS.infoText,
                  { marginTop: verticalScale(10), color: "black" },
                ]}
              >
                {comment}
              </Text>
              {/* <Text style={styles.recipeTitle}>{title}</Text> */}

              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={{
                    marginTop: verticalScale(15),
                    flexDirection: "row",
                    alignItems: "center",
                    gap: moderateScale(5),
                  }}
                  onPress={() => {
                    setReplyValues({
                      username: username,
                      commentId: commentId,
                    });
                    setReplying(true);

                    inputRef.current.blur();
                    setTimeout(() => {
                      inputRef.current.focus();
                    }, 100);
                  }}
                >
                  <Ionicons name="chatbubble-outline" size={15} />
                  <Text style={{ color: "grey", fontWeight: "bold" }}>
                    Answer
                  </Text>
                </Pressable>

                <Pressable
                  style={{
                    marginTop: verticalScale(15),
                    flexDirection: "row",
                    alignItems: "center",
                    gap: moderateScale(5),
                  }}
                  onPress={() => {
                    Alert.alert("Report", "Comment succesfully reported");
                  }}
                >
                  <Ionicons
                    name="flag-outline"
                    size={15}
                    style={{ marginLeft: horizontalScale(10) }}
                  />
                  <Text style={{ color: "grey", fontWeight: "bold" }}>
                    Report
                  </Text>
                </Pressable>
              </View>

              {itemSnap.reply
                ? Object.keys(itemSnap.reply)
                    .sort((a, b) => b - a)
                    .map((key, index) => {
                      console.log(key);
                      return (
                        <ReplyComment
                          key={index}
                          username={itemSnap.reply[key].username}
                          comment={itemSnap.reply[key].comment}
                          time={itemSnap.reply[key].time}
                          photoUrl={itemSnap.reply[key].photoUrl}
                          uid={itemSnap.reply[key].uid}
                          objectKey={key}
                          documentId={postSnap.documentId}
                          commentId={commentId}
                        />
                      );
                    })
                : null}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  renderSeparatorView = () => {
    return <View style={styles.separator} />;
  };

  const inputRef = React.useRef();
  const [value, setValue] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {!loading ? <HudView /> : null}
      <FlashList
        estimatedItemSize={137}
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
              commentId={item.id}
              itemSnap={item}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: COLORS.transparentBlack1,
        }}
      >
        {isReplying ? (
          <View>
            <View style={styles.replyContainer}>
              <Text>Replying to {replyValues.username.slice(0, 14)}</Text>
              <Pressable
                onPress={() => {
                  Keyboard.dismiss();
                  setReplying(false);
                  setReplyValues([]);
                }}
              >
                <Entypo name="cross" size={24} color="grey" />
              </Pressable>
            </View>
          </View>
        ) : null}

        <View style={styles.replyInputContainer}>
          <UserAvatar
            image={userSnap.photoUrl}
            width={45}
            height={45}
            position={"center"}
          />
          <View style={styles.commentInput}>
            <View style={{ flex: 1 }}>
              <CustomTextInput
                _submitComment={_submitComment}
                inputRef={inputRef}
                value={value}
                setValue={setValue}
              />
            </View>

            <Pressable
              onPress={() => {
                _submitComment(value);
                Keyboard.dismiss();
              }}
            >
              <Ionicons name="send-outline" size={20} color={"tomato"} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

//Textinput separate component
const CustomTextInput = ({ _submitComment, inputRef, value, setValue }) => {
  return (
    <TextInput
      placeholder="Write your comment."
      selectionColor={COLORS.transparentBlack5}
      style={styles.text}
      onChangeText={(text) => setValue(text)}
      value={value}
      onSubmitEditing={(event) => _submitComment(event.nativeEvent.text)}
      ref={inputRef}
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
    color: COLORS.textGrey,
    fontWeight: "bold",
  },

  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: horizontalScale(10),
    borderRadius: 30,
    borderColor: COLORS.transparentBlack1,
    margin: moderateScale(10),
    justifyContent: "space-between",
    backgroundColor: COLORS.grey2,
    flex: 1,
  },

  replyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
