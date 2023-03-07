import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import {
  ActivityIndicator,
  Alert,
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
import RoundedIconButton from "../components/RoundedIconButton";
import { GoogleIcon } from "../assets";
import { useNavigation } from "@react-navigation/native";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Register";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import Home from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
      placeHolder: "Password",
      selectionColor: "orange",
      iconName: "lock-closed-outline",
      textContentType: "password",
      setValue: setPassword,
      secureTextEntry: true,
    },
  ];

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, "silinecek@gmail.com", "123456")
        .then(async () => {
          Alert.alert("succes");
        })
        .catch((err) => Alert.alert("Login Error", err.message));
    }
  };

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

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate(ForgotPassword)}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <RoundedButton text="Login" buttonOnPress={handleLogin} />

          {/* Divider */}

          <Divider text="OR" />

          {/* Google Button */}
          <RoundedIconButton
            text="Login with Google"
            bgColor="#f1f5f6"
            image={GoogleIcon}
          />

          {/* Bottom */}
          <View style={styles.bottom}>
            <Text style={styles.bottomNormalText}>New to food recipes?</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
              <Text style={styles.bottomRegisterText}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: horizontalScale(10),
  },
  picture: {
    height: moderateScale(180),
    marginTop: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
  },

  middleSectionContainer: {
    margin: horizontalScale(30),
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
    // marginRight: horizontalScale(60),
  },
  forgotPasswordText: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: "#0c60d0",
  },

  bottom: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: verticalScale(30),
  },
  bottomNormalText: {
    fontSize: moderateScale(15),
    color: "#9AA3B2",
  },
  bottomRegisterText: {
    color: "#0065ff",
    fontWeight: "bold",
    fontSize: moderateScale(15),
  },
});
