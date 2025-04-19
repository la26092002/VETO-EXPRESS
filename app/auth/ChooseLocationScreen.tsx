import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Alert,
    ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, AsyncStorageValue } from "@/constants/Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useDataContext } from "@/context/DataContext";

export default function ChooseLocationScreen() {
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useDataContext();

    const getCurrentLocationAndSave = async () => {

        try {
            setLoading(true);
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission refusée", "La permission de localisation est nécessaire.");
                setLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // 🔁 Reverse geocoding to get address
            const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
            const firstAddress = geocode[0];
            console.log(firstAddress)
            const adresseMap = firstAddress
                ? `${firstAddress.name}, ${firstAddress.street}, ${firstAddress.city}, ${firstAddress.region}, ${firstAddress.country}`
                : "Adresse inconnue";

            const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
            if (!token) {
                Alert.alert("Erreur", "Token manquant. Veuillez vous reconnecter.");
                setLoading(false);
                return;
            }

            // 🛰️ Send to API
            const response = await fetch(`${API.BASE_URL}/api/auth/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userLatitude: latitude,
                    userLongitude: longitude,
                    adresseMap: adresseMap,
                }),
            });

            if (response.ok) {
                dispatch({
                    type: "UPDATE_USER",
                    payload: {
                        userLatitude: latitude,
                        userLongitude: longitude,
                        adresseMap: adresseMap
                    },
                });
                Alert.alert("Succès", "Votre position et adresse ont été mises à jour.");
                router.replace("/deliveryTo");
            } else {
                const data = await response.json();
                Alert.alert("Erreur", data.message || "Une erreur s'est produite.");
            }
        } catch (error) {
            console.error("Erreur localisation :", error);
            Alert.alert("Erreur", "Impossible d'obtenir votre position.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            <View className="flex-row items-center justify-between px-4 py-3">
               
                <Text className="text-lg font-medium text-center flex-1">Choisir votre position</Text>
                <View className="w-6" />
            </View>

            <View className="px-5 mt-8">
                <Text className="text-2xl font-semibold text-gray-900 mb-4">Où souhaitez-vous être livré ?</Text>
                <Text className="text-gray-600 mb-8">
                    Sélectionnez votre position actuelle ou choisissez une autre adresse manuellement.
                </Text>

                {/* Bouton : Utiliser ma position actuelle */}
                <TouchableOpacity
                    className="bg-blue-800 py-4 rounded-lg mb-4"
                    onPress={getCurrentLocationAndSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-center font-medium">Utiliser ma position actuelle</Text>
                    )}
                </TouchableOpacity>

                {/* Bouton : Choisir une autre adresse */}
                <TouchableOpacity
                    className="border border-blue-800 py-4 rounded-lg"
                    onPress={() => router.navigate("settings/selectLocation")}
                >
                    <Text className="text-blue-800 text-center font-medium">Choisir une autre adresse</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
