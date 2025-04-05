import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// Get screen dimensions for responsive design
export default function WelcomeScreen({ onStart }: { onStart: (started: boolean) => void }) {
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <StatusBar barStyle="dark-content" />

      {/* Content Container */}
      <View className="flex-1 items-center justify-evenly px-8 relative">
        <Image
          source={require("@/assets/images/circle.png")}
          className=" absolute -left-1/2 -top-[18%] "
        />
        {/* Logo */}
        <View className="items-center mb-16 mt-14">
          <Text className="text-4xl font-semibold text-gray-800 text-center !font-PottaOne">
            VETO{"\n"}EXPRESS
          </Text>
        </View>
        <Image
          source={require("@/assets/images/photo_6.png")}
          className="h-32 w-32 object-contain"
        />

        {/* Welcome Text */}
        <View className="items-center mb-16">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome
          </Text>
          <Text className="text-base text-gray-700 text-center ">
            It's a pleasure to meet you. We are excited that you're here so
            let's get started!
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity className="bg-blue-800 py-4 px-8 rounded-lg w-full" >
          <Text className="text-white text-center font-medium">
            GET STARTED
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
