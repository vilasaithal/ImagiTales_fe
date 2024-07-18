import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import authscreen from "./screens/AuthScreen"; // Adjust the path if necessary
import SelectionsPage from "./screens/SelectionsPage";
import welcome from "./screens/welcome";
import Storypage from "./screens/storypage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { EagleLake_400Regular } from "@expo-google-fonts/eagle-lake";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    EagleLake_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthScreen">
        <Stack.Screen
          name="AuthScreen"
          component={authscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectionsPage"
          component={SelectionsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="storypage"
          component={Storypage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="welcome"
          component={welcome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
