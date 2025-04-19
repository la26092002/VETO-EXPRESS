import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { register } from "@/fetshApi/auth";
import { Acteur, API } from "@/constants/Backend";
const BASE_URL = API.BASE_URL;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateAccountScreen() {
  const [fullName, setFullName] = useState("user");
  const [email, setEmail] = useState("user@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+213798599533");
  const [password, setPassword] = useState("******");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !phoneNumber || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    setIsLoading(true);
    try {
      const user = {
        nom: fullName,
        email,
        telephone: phoneNumber,
        password,
        nomEtablissement: fullName,
        adresseMap: "",
        businessActivity: Acteur.Client,
        typeActeur: Acteur.Client
      };

      const response = await fetch(`${BASE_URL}${API.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.message === 'Email already in use') {
          Alert.alert("Échec de l'inscription", "Cet e-mail est déjà utilisé. Veuillez en utiliser un autre ou vous connecter.");
          await AsyncStorage.setItem('emailValidate', user.email);
          router.navigate("auth/login");
        } else {
          Alert.alert("Échec de l'inscription", data.message || "Une erreur s'est produite. Veuillez réessayer.");
        }
        return;
      }

      Alert.alert("Succès", "Compte créé avec succès !");
      await AsyncStorage.setItem('emailValidate', user.email);
      router.navigate("auth/validateAccount");

    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      Alert.alert("Échec de l'inscription", "Erreur réseau. Veuillez vérifier votre connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.navigate('auth/login')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">
          Créer un compte
        </Text>
        <View className="w-6">
          <Text className="text-transparent">.</Text>
        </View>
      </View>

      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">
          Créer un compte
        </Text>
        <View className="flex-row items-center mt-1 mb-6 flex-wrap">
          <Text className="text-gray-500">
            Entrez votre nom, e-mail, numéro de téléphone et mot de passe.
          </Text>
          <TouchableOpacity onPress={() => router.navigate('auth/login')}>
            <Text className="text-blue-600 ml-1">Déjà un compte ?</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">NOM COMPLET</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={fullName}
              onChangeText={setFullName}
            />
            <Ionicons name="checkmark" size={20} color="#205781" />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">ADRESSE E-MAIL</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Ionicons name="checkmark" size={20} color="#205781" />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">NUMÉRO DE TÉLÉPHONE</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <Ionicons name="call" size={20} color="#205781" />
          </View>
        </View>

        <View className="mb-8">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xs text-gray-400 mb-1">MOT DE PASSE</Text>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Ionicons name="checkmark" size={20} color="#205781" />
          </View>
        </View>

        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-medium">S'INSCRIRE</Text>
          )}
        </TouchableOpacity>

        <Text className="text-gray-500 text-center text-sm mb-6">
          En vous inscrivant, vous acceptez nos Conditions Générales et notre Politique de Confidentialité.
        </Text>

        <Text className="text-gray-500 text-center text-sm mb-6">Ou</Text>

        <TouchableOpacity className="flex-row bg-blue-600 py-3 rounded-lg mb-3 flex justify-around items-center">
          <View className="bg-white p-1 rounded-sm mr-2">
            <Image
              source={require("@/assets/images/facebook.png")}
              className="w-7 h-7"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white font-medium">SE CONNECTER AVEC FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row bg-blue-500 py-3 rounded-lg flex justify-around items-center">
          <View className="bg-white p-1 rounded-sm mr-2">
            <Image
              source={require("@/assets/images/google.png")}
              className="w-7 h-7"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white font-medium">SE CONNECTER AVEC GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
