import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

const CustomSnackbar = (props) => {
  const { snackbarAttr, setter } = props;
  const onDismissSnackBar = () => setter({ visible: false });

  return (
    <View style={styles.container}>
      <Snackbar
        duration={550}
        visible={snackbarAttr.visible}
        onDismiss={onDismissSnackBar}
      >
        {snackbarAttr.text}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    zIndex: 100,
  },
});

export default CustomSnackbar;
