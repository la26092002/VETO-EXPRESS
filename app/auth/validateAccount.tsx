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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ValidateAccountScreen() {
  // State for code input
  const [code, setCode] = useState("");

  // AsyncStorage.getItem('emailValidate'),
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header with back button and title */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.navigate('auth/createAccount')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Verify Code</Text>
        <View className="w-6" />
      </View>

      {/* Verify Code Section */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Verify Code</Text>
        <Text className="text-gray-500 mt-1 mb-6">
          Enter the verification code sent to your email to validate your account.
        </Text>

        {/* Code Input */}
        <View className="mb-8">
          <Text className="text-xs text-gray-400 mb-1">VERIFICATION CODE</Text>
          <View className="flex-row justify-between">
            {[...Array(6)].map((_, index) => (
              <TextInput
                key={index}
                className="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-md"
                keyboardType="numeric"
                maxLength={1}
                value={code[index] || ""}
                onChangeText={(text) => {
                  let newCode = code.split("");
                  newCode[index] = text;
                  setCode(newCode.join(""));
                }}
              />
            ))}
          </View>
        </View>

        {/* Validate Button */}
        <TouchableOpacity className="bg-blue-800 py-4 rounded-lg mb-4"
         onPress={() => router.navigate('/deliveryTo')}>
          <Text className="text-white text-center font-medium">VALIDATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
