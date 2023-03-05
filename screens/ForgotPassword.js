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
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: useHeaderHeight(),
        backgroundColor: "#fff",
        paddingHorizontal: horizontalScale(10),
      }}
    >
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
          <View>
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
  },
  titleText: TEXTS.titleText,
  middleSectionContainer: BODY.middleSection,
  infoText: {
    color: "grey",
    marginBottom: verticalScale(20),
  },
});
