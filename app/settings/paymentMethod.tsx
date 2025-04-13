import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList, Alert } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const initialCards = [
  { id: '1', type: 'Visa', number: '**** **** **** 1234', expiry: '12/25' },
  { id: '2', type: 'MasterCard', number: '**** **** **** 5678', expiry: '08/24' },
  { id: '3', type: 'American Express', number: '**** **** **** 9012', expiry: '03/26' },
];

export default function PaymentCardsScreen() {
  const [cards, setCards] = useState(initialCards);

  const deleteCard = (id: string) => {
    Alert.alert(
      "Delete Card",
      "Are you sure you want to delete this card?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          setCards((prev) => prev.filter((card) => card.id !== id));
        }},
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header with back button */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">My Cards</Text>
        <View className="w-6" />
      </View>

      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Payment Cards</Text>
        <Text className="text-gray-500 mb-6">Manage your saved payment methods</Text>

        <TouchableOpacity
          onPress={() => router.push('settings/add-paymentCardsScreen')}
          className="bg-blue-800 py-4 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-medium">+ Add New Card</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        className="flex-1"
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm mt-2">
            <View className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <FontAwesome5 name="credit-card" size={24} color="#1e40af" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">{item.type}</Text>
              <Text className="text-sm text-gray-500">Number: {item.number}</Text>
              <Text className="text-sm text-gray-500">Expiry: {item.expiry}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteCard(item.id)}>
              <Ionicons name="trash-outline" size={24} color="#dc2626" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
