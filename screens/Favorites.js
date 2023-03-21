import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  db,
  getCollectionByField,
  getFavorites,
} from "../utils/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import HudView from "../components/HudView";
import { collection, getDocs, query, where } from "firebase/firestore";
import { moderateScale, verticalScale } from "../Metrics";
import { ScrollView } from "react-native-gesture-handler";

const Favorites = () => {
  const user = useAuth();
  const [snap, setSnap] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("selam");
    if (user.user !== undefined) {
      _getData(user.user.uid);
    }
  }, [user.user]);

  const _getData = (uid) => {
    getCollectionByField("User", "uid", uid).then((docValue) => {
      getFavorites(docValue.favorites).then((values) => {
        setSnap(values);
        setLoading(false);
      });
    });
  };

  // const _getFavorites = async (favoritesArray) => {
  //   console.log(favoritesArray);
  //   const postRef = collection(db, "post");

  //   const q = query(postRef, where("documentId", "in", favoritesArray));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginTop: -25 }}>
        {loading ? (
          <View style={{}}>
            <HudView />
          </View>
        ) : null}
        {user.user ? (
          <View style={{ padding: moderateScale(20) }}>
            {snap.map((val, index) => {
              return <Text key={index}>{val.documentId}</Text>;
            })}
          </View>
        ) : (
          <Text>Please Sign in</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
