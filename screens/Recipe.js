import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { ExFood } from "../assets";
import { LinearGradient } from "expo-linear-gradient";
import { TEXTS } from "../constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { LayoutAnimation } from "react-native";
import ExpandableIconCard from "../components/ExpandableIconCard";

const Recipe = () => {
  const _topLinear = () => {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: 100,
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,.8)", "transparent"]}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
    );
  };
  const recipeInfo = () => {
    return (
      <View style={styles.recipeCardContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            marginHorizontal: horizontalScale(15),
          }}
        >
          <View>
            <Text style={TEXTS.titleText3}>recipe title</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>avatar </Text>
              <Text>username </Text>
              <Text>recipe rating</Text>
            </View>
          </View>
          <Ionicons name="bookmark-outline" size={24} color="grey" />
        </View>
      </View>
    );
  };

  const content =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  const expandableIconCard = [
    {
      icon: <Ionicons name="reader-outline" size={24} />,
      title: "Instructions",
      content: content,
    },
    {
      icon: <MaterialCommunityIcons name="bowl-mix-outline" size={24} />,
      title: "Ingredients",
      content: content,
    },
  ];
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={ExFood} />
      {_topLinear()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.recipeInfoContainer}>
          {recipeInfo()}
          {expandableIconCard.map((details, index) => (
            <ExpandableIconCard {...details} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: { backgroundColor: "#fff", flex: 1 },
  image: {
    width: "100%",
    height: moderateScale(280),
  },

  recipeInfoContainer: {
    flex: 1,
    padding: moderateScale(20),
    // marginTop: verticalScale(-72),
    marginTop: verticalScale(265),
  },

  recipeCardContainer: {
    marginBottom: verticalScale(15),
    width: "100%",
    height: moderateScale(80),
    backgroundColor: "#fff",
    borderRadius: moderateScale(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
