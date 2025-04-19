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

  // Gérer le changement de mot de passe
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Le nouveau mot de passe et la confirmation ne correspondent pas.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");
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
        password: oldPassword,
        newPassword,
      };

      const response = await fetch(`${API.BASE_URL}${API.UPDATE_PROFILE}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Succès", "Mot de passe mis à jour avec succès.");
        router.navigate("/accountSetting");
      } else {
        Alert.alert("Erreur", data.message || "Échec de la mise à jour du mot de passe.");
      }
    } catch (error) {
      console.error("Erreur de changement de mot de passe :", error);
      Alert.alert("Erreur", "Erreur réseau. Veuillez réessayer plus tard.");
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
        <Text className="text-lg font-medium text-center flex-1">Changer le mot de passe</Text>
        <View className="w-6" />
      </View>

      {/* Formulaire de changement de mot de passe */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Modifier votre mot de passe</Text>
        <Text className="text-gray-500 mb-6">Veuillez entrer votre ancien mot de passe et en choisir un nouveau.</Text>

        {/* Ancien mot de passe */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">ANCIEN MOT DE PASSE</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
              placeholder="Entrez votre ancien mot de passe"
            />
          </View>
        </View>

        {/* Nouveau mot de passe */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">NOUVEAU MOT DE PASSE</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Entrez votre nouveau mot de passe"
            />
          </View>
        </View>

        {/* Confirmer le mot de passe */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">CONFIRMER LE MOT DE PASSE</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirmez votre nouveau mot de passe"
            />
          </View>
        </View>

        {/* Bouton de mise à jour */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleChangePassword}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-medium">
            {isLoading ? "Mise à jour..." : "METTRE À JOUR LE MOT DE PASSE"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
