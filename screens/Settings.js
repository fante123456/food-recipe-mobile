import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RoundedButton from "../components/Buttons/RoundedButton";
import { auth } from "../utils/firebaseConfig";
import Login from "./Login";
import { Alert } from "react-native";

const Settings = ({ navigation }) => {
  const _handleButton = () => {
    auth.signOut().then(() => navigation.navigate(Login));
    auth
      .signOut()
      .then(async () => {
        // Alert.alert("exited");
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "80%", height: 50 }}>
        <RoundedButton
          buttonOnPress={_handleButton}
          text="Exit"
        ></RoundedButton>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
