import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import RootNavigation from "./navigation";
import { ForgotPassword, Login, Signup, Home } from "./screens";
import { auth } from "./utils/firebaseConfig";
import UserStack from "./navigation/userStack";
import AuthStack from "./navigation/authStack";
import { useUserContext, UserProvider } from "./hooks/UserContext";

const Stack = createNativeStackNavigator();
const AuthhenticatedUserContext = createContext({});

const AuthhenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthhenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthhenticatedUserContext.Provider>
  );
};

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthhenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* {user ? <HomeStack /> : <AuthStack />} */}
      {user ? (
        <UserProvider>
          <UserStack />
        </UserProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
export default function App() {
  // return (
  //   <AuthhenticatedUserProvider>
  //     <RootNavigator />
  //   </AuthhenticatedUserProvider>
  // );
  return (
    <AuthhenticatedUserProvider>
      {/* <UserProvider> */}
      <RootNavigator />
      {/* </UserProvider> */}
    </AuthhenticatedUserProvider>
  );
}

// export default function App() {
//   return <RootNavigation />;
// }

// const HomeStack = () => {
//   return (
//     <Stack.Navigator defaultScreenOptions={Home}>
//       <Stack.Screen name="Home" component={Home} />
//     </Stack.Navigator>
//   );
// };

// const AuthStack = () => {
//   return (
//     <Stack.Navigator
//       defaultScreenOptions={Login}
//       // options={{ headerShown: false }}
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen
//         name="Signup"
//         component={Signup}
//         options={{
//           headerShown: true,
//           headerTransparent: true,
//           headerTitle: "",
//           headerStyle: { backgroundColor: "#fff" },
//         }}
//       />
//       <Stack.Screen
//         name="ForgotPassword"
//         component={ForgotPassword}
//         options={{
//           headerShown: true,
//           headerTransparent: true,
//           headerTitle: "",
//           headerStyle: { backgroundColor: "#fff" },
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
