import React from "react";
import { Favorites, FavoritesScreen, Home, SeeAll } from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Test from "../screens/Test";
import Recipe from "../screens/Recipe";
import { Comments } from "../screens";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <Tab.Navigator
      id="tabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Test") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          }

          // else if (route.name === "Settings") {
          //   iconName = focused ? "ios-list" : "ios-list-outline";
          // }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Test" component={TestStackScreen} />
      <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomePage" component={Home} />
      <HomeStack.Screen
        options={{
          headerShown: true,
        }}
        name="SeeAll"
        component={SeeAll}
      />
      <HomeStack.Screen
        name="RecipePage"
        component={Recipe}
        options={{
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
      <HomeStack.Screen
        options={{
          headerShown: true,
        }}
        name="Comments"
        component={Comments}
      />
    </HomeStack.Navigator>
  );
}

const TestStack = createNativeStackNavigator();

function TestStackScreen() {
  return (
    <TestStack.Navigator screenOptions={{}}>
      <TestStack.Screen name="Comments" component={Comments} />
    </TestStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoritesStack.Screen
        name="My Recipe Book"
        component={Favorites}
        options={{
          headerShown: true,
        }}
      />
      <FavoritesStack.Screen
        options={{
          headerShown: true,
        }}
        name="SeeAll"
        component={SeeAll}
      />
      <FavoritesStack.Screen
        name="RecipePage"
        component={Recipe}
        options={{
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
      <HomeStack.Screen
        options={{
          headerShown: true,
        }}
        name="Comments"
        component={Comments}
      />
    </FavoritesStack.Navigator>
  );
}
