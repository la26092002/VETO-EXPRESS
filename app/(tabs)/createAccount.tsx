import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateAccountScreen() {
  // State for form inputs
  const [fullName, setFullName] = useState("ouiam");
  const [email, setEmail] = useState("ouiam.ouiam@com");
  const [password, setPassword] = useState("******");
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header with back button and title */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">
          Forgot Password
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
            Enter your Name, Email and Password for sign up.
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-600 ml-1">Already have account?</Text>
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

        {/* Password Input */}
        <View className="mb-8">
          <View
            className="flex flex-row items-center
            justify-between"
          >
            <Text className="text-xs text-gray-400 mb-1">PASSWORD</Text>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons name="eye-off" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <Ionicons
              name="checkmark"
              size={20}
              color="#205781"
              className="ml-2"
            />
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity className="bg-blue-800 py-4 rounded-lg mb-4">
          <Text className="text-white text-center font-medium">SIGN UP</Text>
        </TouchableOpacity>

        {/* Terms and Conditions */}
        <Text className="text-gray-500 text-center text-sm mb-6">
          By Signing up you agree to our Terms Conditions & Privacy Policy.
        </Text>

        {/* Or Divider */}
        <Text className="text-gray-500 text-center text-sm mb-6">Or</Text>

        {/* Social Login Buttons */}
        <TouchableOpacity className="flex-row bg-blue-600 py-3 rounded-lg mb-3  flex  justify-around items-center">
          <View className="bg-white p-1 rounded-sm mr-2">
            <Image
              source={require("@/assets/images/facebook.png")}
              className="w-7 h-7"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white font-medium">CONNECT WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row bg-blue-500 py-3 rounded-lg  flex  justify-around items-center ">
          <View className="bg-white p-1 rounded-sm mr-2">
            <Image
              source={require("@/assets/images/google.png")}
              className="!max-w-7 !max-h-7"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white font-medium">CONNECT WITH GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
