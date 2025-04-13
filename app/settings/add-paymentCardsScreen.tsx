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
import { router } from "expo-router";

export default function AddPaymentCardScreen() {
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCard = async () => {
    if (!type || !number || !expiry) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      // Here you would send data to backend or save locally
      console.log({ type, number, expiry });
      Alert.alert("Success", "Card added successfully!");
      router.back(); // navigate back to cards list or dashboard
    } catch (error) {
      console.error("Add card error:", error);
      Alert.alert("Error", "Failed to add card. Try again later.");
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
        <Text className="text-lg font-medium text-center flex-1">Add Card</Text>
        <View className="w-6" />
      </View>

      {/* Form */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Add a New Payment Card</Text>
        <Text className="text-gray-500 mb-6">Please enter your card details below.</Text>

        {/* Card Type */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">CARD TYPE</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={type}
              onChangeText={setType}
              placeholder="e.g. Visa, MasterCard"
            />
          </View>
        </View>

        {/* Card Number */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">CARD NUMBER</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={number}
              onChangeText={setNumber}
              placeholder="Enter card number"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Expiry Date */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">EXPIRY DATE</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={expiry}
              onChangeText={setExpiry}
              placeholder="MM/YY"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleAddCard}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-medium">
            {isLoading ? "Saving..." : "ADD CARD"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
