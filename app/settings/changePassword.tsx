import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { API, AsyncStorageValue } from "@/constants/Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle change password
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const requestBody = {
        password:oldPassword,
        newPassword,
      };

      const response = await fetch(`${API.BASE_URL}${API.UPDATE_PROFILE}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Password updated successfully.");
         router.navigate('/accountSetting');
      } else {
        Alert.alert("Error", data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      Alert.alert("Error", "Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Change Password</Text>
        <View className="w-6" />
      </View>

      {/* Change Password Form */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Change Your Password</Text>
        <Text className="text-gray-500 mb-6">Please enter your old password and choose a new one.</Text>

        {/* Old Password Input */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">OLD PASSWORD</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
              placeholder="Enter your old password"
            />
          </View>
        </View>

        {/* New Password Input */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">NEW PASSWORD</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter your new password"
            />
          </View>
        </View>

        {/* Confirm New Password Input */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">CONFIRM PASSWORD</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm your new password"
            />
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleChangePassword}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-medium">
            {isLoading ? "Updating..." : "UPDATE PASSWORD"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
