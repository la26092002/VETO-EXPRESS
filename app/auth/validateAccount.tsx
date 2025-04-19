import React, { useState, useEffect } from "react";
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
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ValidateAccountScreen() {
  const [code, setCode] = useState("");
  const [validationToken, setValidationToken] = useState("");

  useEffect(() => {
    const fetchValidationCode = async () => {
      try {
        // Retrieve the email from AsyncStorage
        const email = await AsyncStorage.getItem("emailValidate");

        if (email) {
          const response = await fetch("http://35.181.18.120:3000/api/auth/send-validation-code", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            setValidationToken(data.validationToken);
            Alert.alert("Code envoyé", "Un code de validation a été envoyé à votre e-mail.");
          } else {
            Alert.alert("Erreur", data.message || "Erreur lors de l'envoi du code.");
          }
        } else {
          Alert.alert("Erreur", "Email introuvable dans AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching validation code:", error);
        Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi du code.");
      }
    };

    fetchValidationCode();
  }, []);

  const handleValidateAccount = async () => {
    try {
      const response = await fetch("http://35.181.18.120:3000/api/auth/validate-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          validationToken,
          enteredCode: code,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Succès", "Votre compte a été validé avec succès.");
        router.navigate("/login");
      } else {
        Alert.alert("Erreur", data.message || "Le code de validation est incorrect.");
      }
    } catch (error) {
      console.error("Error validating account:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la validation du compte.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* En-tête avec bouton de retour et titre */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.navigate('auth/createAccount')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Vérifier le code</Text>
        <View className="w-6" />
      </View>

      {/* Section de vérification du code */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Vérifier le code</Text>
        <Text className="text-gray-500 mt-1 mb-6">
          Entrez le code de vérification envoyé à votre e-mail pour valider votre compte.
        </Text>

        {/* Champ du code de vérification */}
        <View className="mb-8">
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

        {/* Bouton de validation */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleValidateAccount}
        >
          <Text className="text-white text-center font-medium">VALIDER LE COMPTE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
