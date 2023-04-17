import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../Metrics";
import { COLORS, TEXTS } from "../../constants";
import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { currentUserSnap } from "../../hooks/getCurrentUserSnap";
import { Pressable } from "react-native";
import { deleteField, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { Alert } from "react-native";
import CommentDeleteAlert from "../Buttons/Alert/CommentDeleteAlert";

const ReplyComment = ({
  username,
  comment,
  time,
  photoUrl,
  uid,
  objectKey,
  documentId,
  commentId,
}) => {
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
    <View style={styles.container}>
      <View
        style={{
          height: 45,
          alignSelf: "flex-start",
        }}
      >
        <Image
          resizeMode="stretch"
          // source={{ uri: image }}
          source={{ uri: photoUrl }}
          style={{
            flex: 1,
            width: 45,
            borderRadius: 30,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.grey2,
          borderRadius: 10,
          padding: moderateScale(10),
        }}
      >
        <Text style={TEXTS.titleText3}>{username.slice(0, 14)}</Text>
        <Text style={{ fontSize: moderateScale(12.5), color: "grey" }}>
          {date}
        </Text>

        {currentUserSnap().uid === uid ? (
          <Ionicons
            color={"tomato"}
            name="trash-outline"
            size={15}
            style={{
              position: "absolute",
              right: moderateScale(15),
              top: moderateScale(10),
            }}
            onPress={() =>
              // createTwoButtonAlert(documentId, commentId, objectKey)
              CommentDeleteAlert(documentId, commentId, objectKey)
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
      </View>
    </View>
  );
};

export default ReplyComment;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(260),
    marginTop: verticalScale(10),
    flexDirection: "row",
    gap: moderateScale(10),
    padding: moderateScale(5),
  },
});
