import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { BODY, TEXTS } from "../constants";
import { SignUpImage } from "../assets";
import CustomInput from "../components/input";
import RoundedButton from "../components/RoundedButton";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const customInputs = [
    {
      id: 1,
      placeHolder: "Email",
      selectionColor: "orange",
      iconName: "at-outline",
      setValue: setEmail,
      secureTextEntry: false,
      textContentType: "emailAddress",
    },
    {
      id: 2,
      placeHolder: "Nickname",
      selectionColor: "orange",
      iconName: "person-outline",
      setValue: setUsername,
      secureTextEntry: false,
      textContentType: "nickname",
    },
    {
      id: 3,
      placeHolder: "Password",
      selectionColor: "orange",
      iconName: "at-outline",
      setValue: setPassword,
      secureTextEntry: true,
      textContentType: "password",
    },
  ];
  const buttonOnPress = () => {
    alert(`Email: ${email}\nNickname: ${nickname}\nPassword: ${password}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* picture */}
        <View style={BODY.picture}>
          <SignUpImage width={undefined} height={undefined} />
        </View>

        {/* body */}
        <View style={BODY.middleSection}>
          {/*Title*/}
          <View>
            <Text style={TEXTS.titleText}>Signup</Text>
          </View>
          {/* Inputs */}
          <CustomInput {...customInputs} />
          {/* Button */}
          <RoundedButton text="Signup" buttonOnPress={buttonOnPress} />

          <View style={styles.infoContainer}>
            <Text style={TEXTS.infoText}>Joined us before?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginText}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: horizontalScale(10),
    marginTop: verticalScale(15),
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(30),
  },
  loginText: {
    color: "#0065ff",
    fontWeight: "bold",
    fontSize: moderateScale(15),
  },
});
