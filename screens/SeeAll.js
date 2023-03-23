import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const SeeAll = ({ route, navigation }) => {
  const { selectedSnap, title } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: title });
  }, [title]);

  const Item = ({ image, title, addedBy, itemSnap, rating }) => {
    let ratingOfTheItem = 0;
    if (rating) {
      rating.map((e) => {
        ratingOfTheItem += e.number;
      });
      ratingOfTheItem /= itemSnap.rating.length;
    }
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => console.log(itemSnap.documentId)}
      >
        <View
          style={{
            padding: moderateScale(10),
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.categoryStyle}>
            <View
              style={{
                height: 55,
              }}
            >
              <Image
                resizeMode="stretch"
                source={{ uri: image }}
                style={{
                  flex: 1,
                  width: 55,
                  borderRadius: 30,
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
              }}
            >
              <Text style={styles.recipeTitle}>{title}</Text>
            </View>
            <FontAwesome
              name="angle-right"
              size={24}
              color="orange"
              style={{ marginRight: horizontalScale(10) }}
            />
          </View>
        </View>
      </Pressable>
    );
  };

  renderSeparatorView = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {selectedSnap.length > 0 ? (
        <FlatList
          ItemSeparatorComponent={this.renderSeparatorView}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={175}
          scrool
          data={selectedSnap} // 4 tane var see all ile hepsini goster !
          renderItem={({ item }) => {
            return (
              <Item
                image={item.coverImagePath}
                title={item.title}
                addedBy={item.addedBy}
                itemSnap={item}
                rating={item.rating}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ textAlign: "center" }}>not found</Text>
        </View>
      )}
    </View>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
  },

  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    rightText: {
      marginRight: horizontalScale(10),
      color: "#5A6780",
    },
  },
  categoryStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: horizontalScale(5),
    gap: moderateScale(25),
  },
  image: {
    width: moderateScale(75),
    height: moderateScale(75),

    justifyContent: "center",
    alignItems: "center",
  },

  categoryText: {
    color: "white",
    fontWeight: "bold",
  },

  ratingContainer: {
    position: "absolute",
    right: 0,
    padding: moderateScale(5),
    width: moderateScale(55),
    marginRight: horizontalScale(10),
    marginTop: horizontalScale(10),
    borderRadius: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  recipeTitle: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#172b4d",
    textAlign: "left",
  },

  separator: { height: 1, width: "100%", backgroundColor: "#DEE2E5" },
});
