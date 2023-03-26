import {
  StyleSheet,
  Text,
  View,
  Pressable,
  LayoutAnimation,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { moderateScale, verticalScale } from "../Metrics";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TEXTS } from "../constants";

const ExpandableIconCard = (props) => {
  const { icon, title, content } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const toggleExpansion = () => {
    startAnimation();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(rotateAnim, {
      toValue: isRotated ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsRotated(!isRotated));
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });
  return (
    <View style={styles.recipeExpandableContainer}>
      <Pressable onPress={toggleExpansion}>
        <View style={styles.cardContainer}>
          <View style={styles.cardLeftSection}>
            {icon}
            <Text style={[TEXTS.titleText3]}>{title}</Text>
          </View>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons name="chevron-forward-outline" size={24} />
          </Animated.View>
        </View>

        {isExpanded ? (
          <>
            <View
              style={{
                height: 1.2,
                backgroundColor: "#B8B8B8",
              }}
            />
            <View
              style={{
                padding: moderateScale(15),
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  marginBottom: 5,
                }}
              >
                {content}
              </Text>
            </View>
          </>
        ) : null}
      </Pressable>
    </View>
  );
};

export default ExpandableIconCard;

const styles = StyleSheet.create({
  recipeExpandableContainer: {
    flex: 1,
    borderRadius: moderateScale(15),
    borderColor: "#B8B8B8",
    borderWidth: 1,
    backgroundColor: "#fff",
    height: "100%",
    marginBottom: verticalScale(15),
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: moderateScale(15),
  },
  cardLeftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
});
