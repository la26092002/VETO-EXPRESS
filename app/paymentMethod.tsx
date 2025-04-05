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

export default function PaymentMethodScreen() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPaymentMethod = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (cardNumber.length < 16) {
      Alert.alert("Error", "Invalid card number.");
      return;
    }

    if (cvv.length < 3) {
      Alert.alert("Error", "Invalid CVV.");
      return;
    }

    setIsLoading(true);

    // Here you can add API calls to save the payment method data

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Payment method added successfully.");
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Payment Method</Text>
        <View className="w-6" />
      </View>

      {/* Payment Method Form */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Add Your Payment Method</Text>
        <Text className="text-gray-500 mb-6">Enter your credit card details below.</Text>

        {/* Card Holder Name */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">CARD HOLDER NAME</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={cardHolderName}
              onChangeText={setCardHolderName}
              placeholder="Enter card holder name"
            />
          </View>
        </View>

        {/* Card Number */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">CARD NUMBER</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              placeholder="Enter card number"
            />
          </View>
        </View>

        {/* Expiry Date */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">EXPIRY DATE (MM/YY)</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={expiryDate}
              onChangeText={setExpiryDate}
              keyboardType="numeric"
              placeholder="MM/YY"
            />
          </View>
        </View>

        {/* CVV */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 mb-1">CVV</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              secureTextEntry
              placeholder="Enter CVV"
            />
          </View>
        </View>

        {/* Add Payment Button */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mb-4"
          onPress={handleAddPaymentMethod}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-medium">
            {isLoading ? "Adding..." : "ADD PAYMENT METHOD"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
