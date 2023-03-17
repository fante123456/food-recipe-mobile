import React from "react";
import { Home, SeeAll } from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="SeeAll"
        component={SeeAll}
      />
    </Stack.Navigator>
  );
}
