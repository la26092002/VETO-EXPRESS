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
  // State for form inputs
  const [fullName, setFullName] = useState("ouiam");
  const [email, setEmail] = useState("ouiam.ouiam@com");
  const [phoneNumber, setPhoneNumber] = useState("+213798599533");
  const [password, setPassword] = useState("******");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false); // State for loading

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // Handle registration
// Handle registration
const handleRegister = async () => {
  if (!fullName || !email || !phoneNumber || !password) {
    Alert.alert("Error", "All fields are required.");
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

    const response = await fetch(`${BASE_URL}${API.REGISTER}`, { // Replace with your actual API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400 && data.message === 'Email already in use') {
        Alert.alert("Registration Failed", "This email is already registered. Please use a different email or login.");
        await AsyncStorage.setItem('emailValidate', user.email);
        // Navigate to validation screen or home
    router.navigate("/login");
      } else {
        Alert.alert("Registration Failed", data.message || "Registration failed. Please try again.");
      }
      return;
    }

    // Success case
    Alert.alert("Success", "Account created successfully!");

     await AsyncStorage.setItem('emailValidate', user.email);
    
    // Navigate to validation screen or home
    router.navigate("/validateAccount");
    
  } catch (error) {
    console.error('Registration error:', error);
    Alert.alert("Registration Failed", "Network error. Please check your connection and try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header with back button and title */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.navigate('/login')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">
          Create Account
        </Text>
        <View className="w-6">
          <Text className="text-lg font-medium text-center flex-1 text-transparent">
            Empty view for centering
          </Text>
        </View>
      </View>

      {/* Create Account Section */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">
          Create Account
        </Text>
        <View className="flex-row items-center mt-1 mb-6 flex-wrap">
          <Text className="text-gray-500">
            Enter your Name, Email, Phone Number, and Password for sign up.
          </Text>
          <TouchableOpacity onPress={() => router.navigate('/login')}>
            <Text className="text-blue-600 ml-1">Already have an account?</Text>
          </TouchableOpacity>
        </View>

        {/* Full Name Input */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">FULL NAME</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={fullName}
              onChangeText={setFullName}
            />
            <Ionicons name="checkmark" size={20} color="#205781" />
          </View>
        </View>

        {/* Email Input */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">EMAIL ADDRESS</Text>
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

        {/* Phone Number Input */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">PHONE NUMBER</Text>
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

        {/* Password Input */}
        <View className="mb-8">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xs text-gray-400 mb-1">PASSWORD</Text>
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
            <Ionicons name="checkmark" size={20} color="#205781" className="ml-2" />
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
            <Text className="text-white text-center font-medium">SIGN UP</Text>
          )}
        </TouchableOpacity>


        {/* Terms and Conditions */}
        <Text className="text-gray-500 text-center text-sm mb-6">
          By signing up, you agree to our Terms, Conditions & Privacy Policy.
        </Text>

        {/* Or Divider */}
        <Text className="text-gray-500 text-center text-sm mb-6">Or</Text>

        {/* Social Login Buttons */}
        <TouchableOpacity className="flex-row bg-blue-600 py-3 rounded-lg mb-3 flex justify-around items-center">
          <View className="bg-white p-1 rounded-sm mr-2">
            <Image
              source={require("@/assets/images/facebook.png")}
              className="w-7 h-7"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white font-medium">CONNECT WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row bg-blue-500 py-3 rounded-lg flex justify-around items-center">
          <View className="bg-white p-1 rounded-sm mr-2">
            <Image
              source={require("@/assets/images/google.png")}
              className="w-7 h-7"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white font-medium">CONNECT WITH GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
