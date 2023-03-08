import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import ForgotPasswordImage from "../assets/forgot-password.svg";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TEXTS, BODY } from "../constants";
import CustomInput from "../components/input";
import RoundedButton from "../components/Buttons/RoundedButton";
import { ActivityIndicator } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        Alert.alert("success");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        alert(errorMessage);
      });
  };

  const customInput = [
    {
      id: 1,
      placeholder: "Email Id",
      selectionColor: "orange",
      iconName: "at-outline",
      setValue: setEmail,
      secureTextEntry: false,
      textContentType: "emailAddress",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Picture */}
        <View style={styles.picture}>
          <ForgotPasswordImage width={undefined} height={undefined} />
        </View>

        <View style={styles.middleSectionContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.titleText}>Forgot Password?</Text>
          </View>
          {/* Info Text */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Please type yor email and you will be able to reset your password.
            </Text>
          </View>
          {/* Input */}
          {customInput.map((inputVal) => {
            return <CustomInput {...inputVal} key={inputVal.id} />;
          })}

          {!loading ? (
            <RoundedButton text="Send" buttonOnPress={handleForgotPassword} />
          ) : (
            <ActivityIndicator
              size={"large"}
              color="#0065ff"
              style={{
                marginTop: verticalScale(20),
              }}
            />
          )}
          {/* Button */}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: horizontalScale(10),
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
  picture: {
    height: moderateScale(230),
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: moderateScale(200),
    marginTop: horizontalScale(-40),
  },
  titleText: TEXTS.titleText,
  middleSectionContainer: BODY.middleSection,
  infoContainer: {
    marginBottom: verticalScale(50),
  },
  infoText: {
    color: "#5A6780",
    lineHeight: 20,
  },
});
