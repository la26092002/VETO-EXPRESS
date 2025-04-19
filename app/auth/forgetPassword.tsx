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
import { router } from "expo-router";
import { API } from "@/constants/Backend";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Erreur de validation", "Veuillez saisir votre adresse e-mail.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API.BASE_URL}/api/auth/send-validation-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Succès", data.message || "Vérifiez votre boîte mail pour le code de réinitialisation.");
        router.push({
          pathname: "auth/verifyCode",
          params: { validationToken: data.validationToken },
        });

      } else {
        Alert.alert("Erreur", data.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      Alert.alert("Erreur réseau", "Échec de la connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* En-tête */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.navigate("auth/login")}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">
          Mot de passe oublié
        </Text>
        <View className="w-6" />
      </View>

      {/* Contenu */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">
          Réinitialiser le mot de passe
        </Text>
        <Text className="text-gray-500 mt-1 mb-6">
          Entrez votre e-mail pour recevoir les instructions de réinitialisation.
        </Text>

        {/* Champ e-mail */}
        <View className="mb-8">
          <Text className="text-xs text-gray-400 mb-1">ADRESSE E-MAIL</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Entrez votre adresse e-mail"
            />
          </View>
        </View>

        {/* Bouton réinitialisation */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text className="text-white text-center font-medium">
            {loading ? "Veuillez patienter..." : "RÉINITIALISER LE MOT DE PASSE"}
          </Text>
        </TouchableOpacity>

        {/* Retour à la connexion */}
        <TouchableOpacity onPress={() => router.navigate("auth/login")}>
          <Text className="text-blue-600 text-center">Retour à la connexion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
