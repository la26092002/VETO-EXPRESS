import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function ForgotPasswordScreen() {
  // State for email input
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header with back button and title */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.navigate('/login')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Forgot Password</Text>
        <View className="w-6" />
      </View>

      {/* Forgot Password Section */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Reset Password</Text>
        <View className="flex-row items-center mt-1 mb-6 flex-wrap">
          <Text className="text-gray-500">Enter your email to receive password reset instructions.</Text>
        </View>

        {/* Email Input */}
        <View className="mb-8">
          <Text className="text-xs text-gray-400 mb-1">EMAIL ADDRESS</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
          </View>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity className="bg-blue-800 py-4 rounded-lg mb-4" 
        onPress={() => router.navigate('/verifyCode')} >
          <Text className="text-white text-center font-medium">RESET PASSWORD</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity  onPress={() => router.navigate('/login')} >
          <Text className="text-blue-600 text-center">Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
