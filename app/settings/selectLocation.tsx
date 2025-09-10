import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, AsyncStorageValue } from "@/constants/Backend";
import { useDataContext } from "@/context/DataContext";

export default function SelectLocationScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const { dispatch } = useDataContext();

  // 📍 Get current location and center map
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission refusée", "La permission de localisation est nécessaire.");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        // First reverse geocode
        const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        const firstAddress = geocode[0];
        setSelectedAddress(
          firstAddress
            ? `${firstAddress.name}, ${firstAddress.street}, ${firstAddress.city}, ${firstAddress.region}, ${firstAddress.country}`
            : "Adresse inconnue"
        );
      } catch (err) {
        console.error("Erreur localisation:", err);
        Alert.alert("Erreur", "Impossible d'obtenir votre position.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔁 Update address when region changes
  const onRegionChangeComplete = async (newRegion: Region) => {
    setRegion(newRegion);
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      });
      const firstAddress = geocode[0];
      setSelectedAddress(
        firstAddress
          ? `${firstAddress.name}, ${firstAddress.street}, ${firstAddress.city}, ${firstAddress.region}, ${firstAddress.country}`
          : "Adresse inconnue"
      );
    } catch (error) {
      console.error("Erreur reverse geocode:", error);
    }
  };

  // 💾 Save selected location
  const saveLocation = async () => {
    if (!region) return;
    try {
      setSaving(true);

      const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
      if (!token) {
        Alert.alert("Erreur", "Token manquant. Veuillez vous reconnecter.");
        setSaving(false);
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
          adresseMap: selectedAddress,
        }),
      });

      if (response.ok) {
        dispatch({
          type: "UPDATE_USER",
          payload: {
            userLatitude: region.latitude,
            userLongitude: region.longitude,
            adresseMap: selectedAddress,
          },
        });
        Alert.alert("Succès", "Votre position a été mise à jour.");
        router.replace("/deliveryTo");
      } else {
        const data = await response.json();
        Alert.alert("Erreur", data.message || "Impossible d'enregistrer la position.");
      }
    } catch (error) {
      console.error("Erreur enregistrement:", error);
      Alert.alert("Erreur", "Impossible d'enregistrer la position.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !region) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choisir une adresse</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>

      {/* Bottom panel */}
      <View style={styles.bottomPanel}>
        <Text style={styles.address}>{selectedAddress}</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveLocation}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Confirmer cette adresse</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  map: { flex: 1 },
  bottomPanel: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  address: { fontSize: 16, marginBottom: 12, textAlign: "center" },
  saveButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 14,
    borderRadius: 8,
  },
  saveText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
