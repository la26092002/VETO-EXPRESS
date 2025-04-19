import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function FAQScreen() {
  const phoneNumber = '+213798599533';

  const handleCall = async () => {
    const url = `tel:${phoneNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erreur', "L'appel n'est pas pris en charge sur cet appareil.");
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
        <Text className="text-lg font-medium text-center flex-1">FAQ</Text>
        <View className="w-6" />
      </View>

      {/* Contenu */}
      <View className="px-5 mt-6">
        <Text className="text-3xl font-semibold text-gray-900">Informations de support</Text>
        <Text className="text-gray-500 mt-4 text-base leading-relaxed">
          Actuellement, notre support est disponible par téléphone. Si vous avez besoin d'aide, n'hésitez pas à nous contacter directement.
        </Text>

        {/* Boîte cliquable avec numéro */}
        <TouchableOpacity
          onPress={handleCall}
          className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <Text className="text-blue-900 font-medium text-lg">Numéro de téléphone :</Text>
          <Text className="text-blue-800 mt-2 text-xl font-bold underline">{phoneNumber}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
