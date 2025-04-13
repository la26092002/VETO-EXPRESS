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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, AsyncStorageValue } from "@/constants/Backend";

export default function AddPetScreen() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPet = async () => {
    if (!name || !type || !age) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
  
      const response = await fetch(`${API.BASE_URL}${API.addPet}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          petName: name,
          petType: type,
          petAge: age,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
  
      const result = await response.json();
      console.log("API Response:", result);
  
      Alert.alert("Success", "Pet added successfully!");
      router.back();
    } catch (error) {
      console.error("Add pet error:", error);
      Alert.alert("Error", error.message || "Failed to add pet. Try again later.");
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
        <Text className="text-lg font-medium text-center flex-1">Add Pet</Text>
        <View className="w-6" />
      </View>

      {/* Form */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Add a New Pet</Text>
        <Text className="text-gray-500 mb-6">Please enter your pet's information below.</Text>

        {/* Pet Name */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">PET NAME</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={name}
              onChangeText={setName}
              placeholder="Enter pet's name"
            />
          </View>
        </View>

        {/* Pet Type */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">PET TYPE</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={type}
              onChangeText={setType}
              placeholder="e.g. Dog, Cat"
            />
          </View>
        </View>

        {/* Pet Age */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">PET AGE</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={age}
              onChangeText={setAge}
              placeholder="e.g. 2 years"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleAddPet}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-medium">
            {isLoading ? "Saving..." : "ADD PET"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
