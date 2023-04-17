import { deleteDoc, deleteField, doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "../../../utils/firebaseConfig";

const CommentDeleteAlert = (documentId, commentId, objectKey) => {
  Alert.alert(
    "Delete Recipe",
    "Are you sure you want to permanently delete the comment?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          const ref = doc(db, "post", `${documentId}/comment/${commentId}`);
          if (objectKey) {
            setDoc(
              ref,
              {
                reply: {
                  [objectKey]: deleteField(),
                },
              },
              { merge: true }
            );
          } else {
            deleteDoc(ref)
              .then(() => {
                console.log("success");
              })
              .catch((error) => {
                console.error("Error ", error);
              });
          }
        },
      },
    ]
  );
};

export default CommentDeleteAlert;
