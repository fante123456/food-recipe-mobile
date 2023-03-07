import { View, Text } from "react-native";
import React from "react";
import { ForgotPassword, Login, Signup } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "#fff" },
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "#fff" },
        }}
        name="Signup"
        component={Signup}
      />
    </Stack.Navigator>
  );
}
