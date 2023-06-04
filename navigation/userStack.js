import React from "react";
import { Favorites, FavoritesScreen, Home, Login, SeeAll } from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Recipe from "../screens/Recipe";
import { Comments } from "../screens";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import Edit from "../screens/Edit";
import AddRecipe from "../screens/AddRecipe";
import MyFeed from "../screens/MyFeed";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <Tab.Navigator
      id="tabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (route.name === "Test") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Setting") {
            iconName = focused ? "cog" : "cog-outline";
          } else if (route.name === "Add") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Feed") {
            iconName = focused ? "newspaper" : "newspaper-outline";
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
      <Tab.Screen name="Add" component={AddRecipeStackScreen} />
      <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
      {/* <Tab.Screen name="Test" component={TestStackScreen} /> */}
      <Tab.Screen name="Feed" component={MyFeedStackScreen} />

      <Tab.Screen name="Setting" component={SettingsStackScreen} />
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
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={Profile}
      />
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="Edit"
        component={Edit}
      />

      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name="AddRecipe"
        component={AddRecipe}
      />
    </HomeStack.Navigator>
  );
}

const TestStack = createNativeStackNavigator();

function TestStackScreen() {
  return (
    <TestStack.Navigator screenOptions={{}}>
      <TestStack.Screen name="Setting" component={Settings} />
    </TestStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{}}>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="Login" component={Login} />
    </SettingsStack.Navigator>
  );
}

const MyFeedStack = createNativeStackNavigator();

function MyFeedStackScreen() {
  return (
    <MyFeedStack.Navigator screenOptions={{ headerShown: false }}>
      <MyFeedStack.Screen name="MyFeed" component={MyFeed} />
      <MyFeedStack.Screen
        name="RecipePage"
        component={Recipe}
        options={{
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
    </MyFeedStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{}}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Edit" component={Edit} />
    </ProfileStack.Navigator>
  );
}

const AddRecipeStack = createNativeStackNavigator();

function AddRecipeStackScreen() {
  return (
    <AddRecipeStack.Navigator screenOptions={{ headerShown: false }}>
      <AddRecipeStack.Screen name="AddRecipe" component={AddRecipe} />
    </AddRecipeStack.Navigator>
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
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={Profile}
      />
    </FavoritesStack.Navigator>
  );
}
