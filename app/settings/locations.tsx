import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDataContext } from '@/context/DataContext';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

export default function LocationScreen() {
  const { state } = useDataContext();
  const { adresseMap, userLatitude, userLongitude } = state.user;

  const handleNavigateToMap = () => {
    if (userLatitude && userLongitude) {
      const url = `https://www.google.com/maps?q=${userLatitude},${userLongitude}`;
      router.push(url);
    } else {
      Alert.alert('Location Not Available', 'User location is not available.');
    }
  };

  const handleChangeLocation = () => {
    // You can navigate to a location picker screen here
    // For now, just show an alert or console log
    // Alert.alert('Change Location', 'This will allow the user to set a new location.');
    router.push('settings/ChooseLocationScreen'); // Example if you create that screen
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header with back button */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">My Location</Text>
        <View className="w-6" />
      </View>

      {/* Content Section */}
      <View className="px-5 mt-4">
        <Text className="text-3xl font-semibold text-gray-900">My Address</Text>
        <Text className="text-gray-500 mt-2">{adresseMap || 'Address not available'}</Text>

        <Text className="text-3xl font-semibold text-gray-900 mt-6">Location Coordinates</Text>
        <Text className="text-gray-500 mt-2">
          {userLatitude && userLongitude
            ? `Latitude: ${userLatitude}, Longitude: ${userLongitude}`
            : 'Location not available'}
        </Text>

        {/* Map View */}
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

        {/* View on Map Button */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mt-6"
          onPress={handleNavigateToMap}
          disabled={!userLatitude || !userLongitude}
        >
          <Text className="text-white text-center font-medium">
            {userLatitude && userLongitude ? 'View on Map' : 'Location Not Available'}
          </Text>
        </TouchableOpacity>

        {/* Change Location Button */}
        <TouchableOpacity
          className="bg-gray-200 py-4 rounded-lg mt-3"
          onPress={handleChangeLocation}
        >
          <Text className="text-gray-900 text-center font-medium">Change My Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
