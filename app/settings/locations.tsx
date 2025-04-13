import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDataContext } from '@/context/DataContext';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker

export default function LocationScreen() {
  const { state } = useDataContext();
  const { adresseMap, userLatitude, userLongitude } = state.user;

  const [currentLatitude, setCurrentLatitude] = useState(userLatitude || null);
  const [currentLongitude, setCurrentLongitude] = useState(userLongitude || null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

  // Request permission and get the user's location if the coordinates are not available
  useEffect(() => {
    const getLocation = async () => {
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude);
          setLocationPermissionGranted(true);
        } else {
          Alert.alert('Permission Denied', 'We need location permission to fetch your location.');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        Alert.alert('Error', 'Failed to get your location.');
      }
    };

    if (!currentLatitude || !currentLongitude) {
      getLocation();
    }
  }, [currentLatitude, currentLongitude]);

  const handleNavigateToMap = () => {
    if (currentLatitude && currentLongitude) {
      const url = `https://www.google.com/maps?q=${currentLatitude},${currentLongitude}`;
      router.push(url);
    } else {
      Alert.alert('Location Not Available', 'User location is not available.');
    }
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
          {currentLatitude && currentLongitude
            ? `Latitude: ${currentLatitude}, Longitude: ${currentLongitude}`
            : locationPermissionGranted
              ? 'Location not available'
              : 'Waiting for location permission...'}
        </Text>

        {/* Map View */}
        {currentLatitude && currentLongitude && (
          <MapView
            style={{ width: '100%', height: 300, marginTop: 20 }}
            initialRegion={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={{ latitude: currentLatitude, longitude: currentLongitude }} />
          </MapView>
        )}

        {/* Button to open map with location */}
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg mt-6"
          onPress={handleNavigateToMap}
          disabled={!currentLatitude || !currentLongitude}
        >
          <Text className="text-white text-center font-medium">
            {currentLatitude && currentLongitude ? 'View on Map' : 'Location Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
