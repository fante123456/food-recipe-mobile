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
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
          <CustomInput
            placeHolder={"Email Id"}
            selectionColor={"orange"}
            iconName="at-outline"
            setValue={setEmail}
            secureTextEntry={false}
            textContentType="emailAddress"
          />
          <CustomInput
            placeHolder={"Password"}
            selectionColor={"orange"}
            iconName="lock-closed-outline"
            textContentType="password"
            setValue={setPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordTextButton}
          onPress={() => console.log(email, password)}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <RoundedButton text={"Login"} />
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
  forgotPasswordTextButton: {
    alignSelf: "flex-end",
    marginRight: horizontalScale(30),
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
