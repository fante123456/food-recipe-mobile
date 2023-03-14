import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TEXTS } from "../constants";

const Category = () => {
  const DATA = [
    {
      id: "1",
      title: "American",
      iconName: "hamburger",
    },
    {
      id: "2",
      title: "Chinese",
      iconName: "noodles",
    },
    {
      id: "3",
      title: "French",
      iconName: "baguette",
    },
    {
      id: "4",
      title: "Italian",
      iconName: "pizza",
    },
    {
      id: "5",
      title: "Mexican",
      iconName: "taco",
    },
    {
      id: "6",
      title: "Spanish",
      iconName: "food-variant",
    },
    {
      id: "7",
      title: "Thai",
      iconName: "silverware-fork-knife",
    },
  ];

  const Item = ({ title, iconName }) => (
    <View style={{ padding: moderateScale(5) }}>
      <Pressable
        onPress={() => {
          console.log(title);
        }}
      >
        {/* <Text>{title}</Text> */}
        <View
          style={{
            backgroundColor: "#172b4d",
            justifyContent: "center",
            alignItems: "center",
            width: moderateScale(90),
            height: moderateScale(90),
            borderRadius: moderateScale(50),
            gap: 5,
          }}
        >
          <MaterialCommunityIcons name={iconName} size={25} color="orange" />
          <Text style={{ color: "white", fontWeight: "bold" }}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={TEXTS.titleText2}>Category</Text>
      <View style={styles.categoryInfo}></View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        scrool
        horizontal={true}
        data={DATA}
        renderItem={({ item }) => (
          <Item title={item.title} iconName={item.iconName} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(15),
  },
  categoryInfo: {},
  categoryImages: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 100,
  },
});
