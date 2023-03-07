import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../utils/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BODY } from "../constants";
import RoundedButton from "../components/Buttons/RoundedButton";
import { horizontalScale } from "../Metrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.middleSectionContainer}>
          <RoundedButton text="Signout" buttonOnPress={handleSignOut} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: horizontalScale(10),
  },
  middleSectionContainer: {
    margin: horizontalScale(30),
  },
});
