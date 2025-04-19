import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDataContext } from '@/context/DataContext';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

export default function LocationScreen() {
  const { state } = useDataContext();
  const user = state?.user;

if (!user) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-gray-700 text-center">Chargement de la localisation...</Text>
    </SafeAreaView>
  );
}
  const { adresseMap, userLatitude, userLongitude } = state.user;

  const handleNavigateToMap = () => {
    if (userLatitude && userLongitude) {
      const url = `https://www.google.com/maps?q=${userLatitude},${userLongitude}`;
      router.push(url);
    } else {
      Alert.alert('Localisation non disponible', 'La localisation de l’utilisateur est indisponible.');
    }
  };

  const handleChangeLocation = () => {
    router.push('settings/ChooseLocationScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* En-tête avec bouton retour */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Ma Localisation</Text>
        <View className="w-6" />
      </View>

      {/* Contenu */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">Mon Adresse</Text>
        <Text className="text-gray-500 mt-2">{adresseMap || 'Adresse non disponible'}</Text>

        <Text className="text-3xl font-semibold text-gray-900 mt-6">Coordonnées GPS</Text>
        <Text className="text-gray-500 mt-2">
          {userLatitude && userLongitude
            ? `Latitude : ${userLatitude}, Longitude : ${userLongitude}`
            : 'Localisation non disponible'}
        </Text>

        {/* Carte */}
        {userLatitude && userLongitude && (
          <MapView
            style={{ width: '100%', height: 300, marginTop: 20 }}
            initialRegion={{
              latitude: userLatitude,
              longitude: userLongitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: userLatitude, longitude: userLongitude }} />
          </MapView>
        )}

        {/* Bouton Voir sur la carte */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mt-6"
          onPress={handleNavigateToMap}
          disabled={!userLatitude || !userLongitude}
        >
          <Text className="text-white text-center font-medium">
            {userLatitude && userLongitude ? 'Voir sur la carte' : 'Localisation non disponible'}
          </Text>
        </TouchableOpacity>

        {/* Bouton Modifier la localisation */}
        <TouchableOpacity
          className="bg-gray-200 py-4 rounded-lg mt-3"
          onPress={handleChangeLocation}
        >
          <Text className="text-gray-900 text-center font-medium">Modifier ma localisation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
