import React from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { auth } from "../utils/firebaseConfig";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootNavigation() {
  //not using
  const { user } = useAuth();

  return user ? <UserStack /> : <AuthStack />;
}
