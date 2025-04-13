import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { API, AsyncStorageValue } from '@/constants/Backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Pet = {
  petId: number;
  petName: string;
  petType: string;
  petAge: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export default function PetsScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPets = async () => {
    try {
      setIsLoading(true);

      const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
      const response = await fetch(`${API.BASE_URL}${API.getAllPets}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pets.");
      }

      const data = await response.json();
      setPets(data.pets || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
      Alert.alert("Error", "Failed to load pets.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const deletePet = async (id: number) => {
    Alert.alert(
      "Delete Pet",
      "Are you sure you want to delete this pet?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete", style: "destructive", onPress: async () => {
            try {
              const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
              const response = await fetch(`${API.BASE_URL}${API.deletePet}${id}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });

              if (!response.ok) {
                throw new Error("Failed to delete pet.");
              }

              setPets((prev) => prev.filter((pet) => pet.petId !== id));
              Alert.alert("Deleted", "Pet has been deleted successfully.");
            } catch (error) {
              console.error("Error deleting pet:", error);
              Alert.alert("Error", "Failed to delete pet.");
            }
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">My Pets</Text>
        <View className="w-6" />
      </View>

      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Pets List</Text>
        <Text className="text-gray-500 mb-6">Manage the animals associated with your account</Text>

        <TouchableOpacity
          onPress={() => router.push('settings/add-pet')}
          className="bg-blue-800 py-4 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-medium">+ Add New Pet</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#1e40af" className="mt-10" />
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.petId.toString()}
          refreshing={isLoading}
          onRefresh={fetchPets}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
          className="flex-1"
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm mt-2">
              <View className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Ionicons name="paw-outline" size={28} color="#1e40af" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">{item.petName}</Text>
                <Text className="text-sm text-gray-500">Type: {item.petType}</Text>
                <Text className="text-sm text-gray-500">Age: {item.petAge}</Text>
              </View>
              <TouchableOpacity onPress={() => deletePet(item.petId)}>
                <Ionicons name="trash-outline" size={24} color="#dc2626" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
