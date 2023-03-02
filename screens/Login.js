import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CookingPicture from "../assets/cooking.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../components/input";
import RoundedButton from "../components/RoundedButton";
import Divider from "../components/Divider";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const customInputs = [
    {
      id: 1,
      placeHolder: "Email Id",
      selectionColor: "orange",
      iconName: "at-outline",
      setValue: setEmail,
      secureTextEntry: false,
      textContentType: "emailAddress",
    },
    {
      id: 2,
      placeHolder: "Password",
      selectionColor: "orange",
      iconName: "lock-closed-outline",
      textContentType: "password",
      setValue: setPassword,
      secureTextEntry: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* picture */}
        <View style={styles.picture}>
          <CookingPicture width={undefined} height={undefined} />
        </View>

        {/* middle section */}
        <View style={styles.middleSectionContainer}>
          {/* Header Text */}
          <Text style={styles.headerText}>Login</Text>
          {/* input details */}

          <CustomInput {...customInputs} />

          {/* {createCustomInput([
            {
              id: 1,
              placeHolder: "Email Id",
              selectionColor: "orange",
              iconName: "at-outline",
              setValue: setEmail,
              secureTextEntry: false,
              textContentType: "emailAddress",
            },
            {
              id: 2,
              placeHolder: "Password",
              selectionColor: "orange",
              iconName: "lock-closed-outline",
              textContentType: "password",
              setValue: setPassword,
              secureTextEntry: true,
            },
          ])} */}

          {/* <CustomInput
            placeHolder={"Password"}
            selectionColor={"orange"}
            iconName="lock-closed-outline"
            textContentType="password"
            setValue={setPassword}
            secureTextEntry={true}
          /> */}
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => console.log(email, password)}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <RoundedButton text={"Login"} />

        {/* Divider */}
        <Divider text={"OR"} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  picture: {
    height: moderateScale(200),
    marginTop: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
  },

  middleSectionContainer: {
    marginLeft: horizontalScale(30),
  },

  headerText: {
    fontSize: moderateScale(35),
    fontWeight: "bold",
    color: "#172b4d",
    marginBottom: verticalScale(30),
    marginTop: verticalScale(10),
    marginLeft: horizontalScale(5),
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginRight: horizontalScale(60),
  },
  forgotPasswordText: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: "#0c60d0",
  },
  buttonsContainer: {
    marginLeft: horizontalScale(30),
  },
});
