import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import ForgotPasswordImage from "../assets/forgot-password.svg";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TEXTS, BODY } from "../constants";
import CustomInput from "../components/input";
import RoundedButton from "../components/RoundedButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const buttonOnPress = () => {
    alert(email);
  };
  const customInput = [
    {
      id: 1,
      placeHolder: "Email Id",
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
          <CustomInput {...customInput} />

          {/* Button */}
          <RoundedButton text="Send" buttonOnPress={buttonOnPress} />
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
    marginTop: verticalScale(15),
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
