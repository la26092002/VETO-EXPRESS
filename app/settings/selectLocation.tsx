import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { API, AsyncStorageValue } from "@/constants/Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { useDataContext } from "@/context/DataContext";


const { width, height } = Dimensions.get("window");

export default function SelectLocationScreen() {
    const { state, dispatch } = useDataContext();

  const [region, setRegion] = useState<Region>({
    latitude: 36.75, // Default: Algiers
    longitude: 3.06,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MapView>(null);

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const handleSaveLocation = async () => {
    try {
      setLoading(true);
      const geocode = await Location.reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      });

      const firstAddress = geocode[0];
      const adresseMap = firstAddress
        ? `${firstAddress.name || ""}, ${firstAddress.street || ""}, ${firstAddress.city || ""}, ${firstAddress.region || ""}, ${firstAddress.country || ""}`
        : "Adresse inconnue";

      const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
      if (!token) {
        Alert.alert("Erreur", "Token manquant. Veuillez vous reconnecter.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API.BASE_URL}/api/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userLatitude: region.latitude,
          userLongitude: region.longitude,
          adresseMap,
        }),
      });

      if (response.ok) {
            dispatch({
              type: "UPDATE_USER",
              payload: {
                userLatitude:region.latitude,
  userLongitude:region.longitude,
  adresseMap: adresseMap
              },
            });
        Alert.alert("Succès", "Votre position a été enregistrée.");
        router.replace("/deliveryTo");
      } else {
        const data = await response.json();
        Alert.alert("Erreur", data.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert("Erreur", "Impossible de sauvegarder votre position.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">
          Choisir une autre adresse
        </Text>
        <View className="w-6" />
      </View>
  
      {/* Controlled Search Bar */}
      <View className="px-4 pt-2">
        <GooglePlacesAutocomplete
          placeholder="Rechercher une adresse..."
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              const loc = details.geometry.location;
              const newRegion = {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegion(newRegion);
              mapRef.current?.animateToRegion(newRegion, 1000);
            }
          }}
          query={{
            key:
              Constants.expoConfig?.extra?.googleMapsApiKey ||
              Platform.select({
                ios: Constants.expoConfig?.ios?.config?.googleMapsApiKey,
                android:
                  Constants.expoConfig?.android?.config?.googleMaps?.apiKey,
              }),
            language: "fr",
          }}
          styles={{
            container: { flex: 0 },
            textInputContainer: {
              backgroundColor: "white",
              borderRadius: 8,
              paddingHorizontal: 4,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 5,
            },
            textInput: {
              height: 44,
              color: "#333",
              fontSize: 16,
            },
          }}
        />
      </View>
  
      {/* Map */}
      <View className="flex-1 mt-2">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={region}
          onRegionChangeComplete={handleRegionChange}
        >
          <Marker coordinate={region} draggable />
        </MapView>
      </View>
  
      {/* Button */}
      <View className="p-5">
        <TouchableOpacity
          className="bg-blue-800 py-4 rounded-lg"
          onPress={handleSaveLocation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-medium">
              Enregistrer cette position
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  
}
