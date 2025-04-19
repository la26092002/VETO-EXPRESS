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
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
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
        throw new Error(errorData.message || "Une erreur s'est produite");
      }

      const result = await response.json();
      console.log("Réponse API :", result);

      Alert.alert("Succès", "Animal ajouté avec succès !");
      router.back();
    } catch (error) {
      console.error("Erreur ajout animal :", error);
      Alert.alert("Erreur", error.message || "Échec de l'ajout de l'animal. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* En-tête */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Ajouter un animal</Text>
        <View className="w-6" />
      </View>

      {/* Formulaire */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Nouvel animal</Text>
        <Text className="text-gray-500 mb-6">Merci de remplir les informations de votre animal.</Text>

        {/* Nom de l’animal */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">NOM DE L'ANIMAL</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={name}
              onChangeText={setName}
              placeholder="Entrez le nom de l’animal"
            />
          </View>
        </View>

        {/* Type de l’animal */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">TYPE D'ANIMAL</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={type}
              onChangeText={setType}
              placeholder="ex. Chien, Chat"
            />
          </View>
        </View>

        {/* Âge de l’animal */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">ÂGE DE L'ANIMAL</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={age}
              onChangeText={setAge}
              placeholder="ex. 2 ans"
            />
          </View>
        </View>

        {/* Bouton de validation */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleAddPet}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-medium">
            {isLoading ? "Enregistrement..." : "AJOUTER L'ANIMAL"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
