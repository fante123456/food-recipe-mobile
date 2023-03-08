import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { BODY, TEXTS } from "../constants";
import { SignUpImage } from "../assets";
import CustomInput from "../components/input";
import RoundedButton from "../components/Buttons/RoundedButton";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const customInputs = [
    {
      id: 1,
      placeholder: "Email",
      selectionColor: "orange",
      iconName: "at-outline",
      setValue: setEmail,
      secureTextEntry: false,
      textContentType: "emailAddress",
    },
    {
      id: 2,
      placeholder: "Nickname",
      selectionColor: "orange",
      iconName: "person-outline",
      setValue: setUsername,
      secureTextEntry: false,
      textContentType: "nickname",
    },
    {
      id: 3,
      placeholder: "Password",
      selectionColor: "orange",
      iconName: "at-outline",
      setValue: setPassword,
      secureTextEntry: true,
      textContentType: "password",
    },
  ];

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // Signed in

        // console.log(user?.uid);
        // sendEmailVerification(user).then(
        //   alert("Email Verification has been sent")
        // );

        await setDoc(doc(db, "User", `${user.uid}`), {
          about: `Hello! welcome to my page`,
          email: email,
          favorites: [],
          followers: 0,
          joinDate: user.metadata.creationTime,
          name: "",
          numberOfPosts: 0,
          posts: [],
          uid: user.uid,
          following: [],
          photoUrl:
            "https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/Defaults%2FdefaultAvatar.png?alt=media&token=aac8b48a-2ce0-4313-8758-662598700004",
          username: nickname,
          bannerPhotoUrl:
            "https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/Defaults%2FdefaultBanner.jpg?alt=media&token=b74c7775-bb92-4d90-b7b9-75aa1ae834b7",
        });
      })
      .then(() => alert("basarili"))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
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
          {customInputs.map((inputVal) => {
            return <CustomInput {...inputVal} key={inputVal.id} />;
          })}
          {/* Button */}
          <RoundedButton text="Signup" buttonOnPress={handleSignUp} />

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
