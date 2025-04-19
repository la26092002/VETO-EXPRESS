import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { API } from "@/constants/Backend";

export default function VerifyCodeScreen() {
  const { validationToken } = useLocalSearchParams();
  console.log("Jeton de validation :", validationToken);

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = async () => {
    if (code.length !== 6 || !newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${API.BASE_URL}/api/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          validationToken,
          enteredCode: code,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Succès", "Mot de passe changé avec succès !");
        router.replace("/auth/login");
      } else {
        Alert.alert("Erreur", data.message || "Échec de la réinitialisation du mot de passe.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.navigate('auth/forgetPassword')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Vérification</Text>
        <View className="w-6" />
      </View>

      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Code de vérification</Text>
        <Text className="text-gray-500 mt-1 mb-6">
          Entrez le code envoyé à votre adresse e-mail et définissez un nouveau mot de passe.
        </Text>

        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">CODE DE VÉRIFICATION</Text>
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

        <View className="mb-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xs text-gray-400 mb-1">NOUVEAU MOT DE PASSE</Text>
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
              placeholder="Entrez un nouveau mot de passe"
            />
          </View>
        </View>

        <View className="mb-8">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xs text-gray-400 mb-1">CONFIRMER LE MOT DE PASSE</Text>
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
              placeholder="Confirmez le mot de passe"
            />
          </View>
        </View>

        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleChangePassword}
        >
          <Text className="text-white text-center font-medium">CONFIRMER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
