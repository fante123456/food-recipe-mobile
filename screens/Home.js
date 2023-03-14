import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BODY } from "../constants";
import RoundedButton from "../components/Buttons/RoundedButton";
import { horizontalScale, moderateScale } from "../Metrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchBar from "../components/Inputs/SearchBar";
import Avatar from "../components/Avatar";
import Category from "../components/Category";
const Home = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const handleSignOut = () => {
    // auth.signOut().then(() => navigation.navigate(Login));
    auth
      .signOut()
      .then(async () => {
        Alert.alert("succes");
      })
      .catch((err) => console.log(err));
  };

  const deneme = () => {
    console.log(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.top}>
          <SearchBar setVal={setSearch} />
          <Avatar />
        </View>

        <Category />

        {/* <View style={{ marginTop: 50, width: "50%", alignSelf: "center" }}>
          <Button title="1ss" onPress={deneme} />
        </View> */}
      </View>

      {/* <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.middleSectionContainer}>
          <RoundedButton text="Signout" buttonOnPress={handleSignOut} />
        </View>
      </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: moderateScale(10),
    marginRight: moderateScale(15),
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
  },
  body: {
    flex: 1,
  },
});
