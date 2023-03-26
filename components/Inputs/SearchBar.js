import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { horizontalScale, moderateScale } from "../../Metrics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants";
import { TextInput } from "react-native-gesture-handler";
import { searchRecipe } from "../../utils/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const SearchBar = (props) => {
  const navigation = useNavigation();
  const { setLoading } = props;
  const [search, setSearch] = useState("");
  const [isEmpty, setEmpty] = useState(false);

  const _onSubmit = async () => {
    if (search !== "") {
      setLoading(true);
      const snap = await searchRecipe(search);
      setLoading(false);
      navigation.push("SeeAll", {
        selectedSnap: snap,
        title: search,
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: horizontalScale(10),
        borderWidth: 2,
        borderRadius: 30,
        borderColor:
          search === "" && isEmpty ? "red" : COLORS.transparentBlack3,
      }}
    >
      <Ionicons name="search-outline" size={moderateScale(22)} />
      <TextInput
        placeholder="Search your recipes"
        selectionColor={COLORS.transparentBlack5}
        style={styles.text}
        onChangeText={(val) => setSearch(val)}
        onSubmitEditing={() => _onSubmit()}
        onFocus={() => (search === "" ? setEmpty(true) : setEmpty(false))}
        onBlur={() => setEmpty(false)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: horizontalScale(10),
    borderWidth: 2,
    borderRadius: 30,
    borderColor: COLORS.transparentBlack3,
  },
  text: {
    marginLeft: moderateScale(8),
    color: COLORS.transparentBlack5,
  },
});
