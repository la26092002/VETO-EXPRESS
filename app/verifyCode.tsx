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

export default function VerifyCodeScreen() {
  // State for inputs
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header with back button and title */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity  onPress={() => router.navigate('/forgetPassword')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Verify Code</Text>
        <View className="w-6" />
      </View>

      {/* Verify Code Section */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Verify Code</Text>
        <Text className="text-gray-500 mt-1 mb-6">
          Enter the verification code sent to your email and set a new password.
        </Text>

        {/* Code Input */}
        <View className="mb-5">
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

        {/* New Password Input */}
        <View className="mb-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xs text-gray-400 mb-1">NEW PASSWORD</Text>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter new password"
            />
          </View>
        </View>

        {/* Confirm Password Input */}
        <View className="mb-8">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xs text-gray-400 mb-1">CONFIRM PASSWORD</Text>
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm new password"
            />
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity className="bg-blue-800 py-4 rounded-lg mb-4">
          <Text className="text-white text-center font-medium">CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
