import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { DataProvider } from "@/context/DataContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    yuGothic: require("../assets/fonts/yu-gothic.ttf"),
    PottaOne: require("../assets/fonts/PottaOne-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <DataProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/createAccount" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/forgetPassword" options={{ headerShown: false }} />
          <Stack.Screen name="auth/verifyCode" options={{ headerShown: false }} />
          <Stack.Screen name="auth/validateAccount" options={{ headerShown: false }} />


          {//With authorisation
          }
          <Stack.Screen name="settings/profileInfo" options={{ headerShown: false }} />
          <Stack.Screen name="settings/changePassword" options={{ headerShown: false }} />
          <Stack.Screen name="settings/locations" options={{ headerShown: false }} />
          <Stack.Screen name="settings/FAQScreen" options={{ headerShown: false }} />

          <Stack.Screen name="service-details" options={{ headerShown: false }} />

          <Stack.Screen name="topServiceDoctor" options={{ headerShown: false }} />
          <Stack.Screen name="topServiceVendeur" options={{ headerShown: false }} />

          <Stack.Screen name="settings/petsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="settings/add-pet" options={{ headerShown: false }} />
          <Stack.Screen name="settings/add-paymentCardsScreen" options={{ headerShown: false }} />

          <Stack.Screen name="settings/paymentMethod" options={{ headerShown: false }} />



          <Stack.Screen name="serviceConsultation/serviceConsultationDetails" options={{ headerShown: false }} />



          <Stack.Screen name="serrviceVendre/ProductSelectionScreen" options={{ headerShown: false }} />
          <Stack.Screen name="serrviceVendre/PanierScreen" options={{ headerShown: false }} />



          { // maps
          }
          <Stack.Screen name="maps/TrafficMapScreen" options={{ headerShown: false }} />


          <Stack.Screen name="settings/ChooseLocationScreen" options={{ headerShown: false }} />
          <Stack.Screen name="settings/selectLocation" options={{ headerShown: false }} />







          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </DataProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
