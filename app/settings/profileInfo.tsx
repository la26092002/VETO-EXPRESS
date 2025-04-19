import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { API, AsyncStorageValue } from "@/constants/Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataContext } from "@/context/DataContext";

export default function ProfileInfoScreen() {
    const { state, dispatch } = useDataContext(); // Récupération des données utilisateur depuis le state global
    const [email, setEmail] = useState(state.user.email || "");
    const [name, setName] = useState(state.user.nom || "");
    const [phone, setPhone] = useState(state.user.telephone || "");
    const [isLoading, setIsLoading] = useState(false);

    // Gérer la mise à jour du profil
    const handleUpdateProfile = async () => {
        if (!name || !email || !phone) {
            Alert.alert("Erreur", "Tous les champs sont requis.");
            return;
        }

        setIsLoading(true);

        try {
            const updatedUser = {
                email: email,
                nom: name,
                telephone: phone,
            };

            const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const response = await fetch(`${API.BASE_URL}${API.UPDATE_PROFILE}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedUser),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Échec de la mise à jour", data.message || "Échec de la mise à jour du profil.");
                return;
            } else {
                Alert.alert("Succès", "Profil mis à jour avec succès.");
                dispatch({ type: 'UPDATE_USER', payload: { ...state.user, ...updatedUser } });
            }

        } catch (error) {
            console.error('Erreur de mise à jour du profil :', error);
            Alert.alert("Échec de la mise à jour", "Erreur réseau. Veuillez vérifier votre connexion et réessayer.");
        } finally {
            setIsLoading(false);
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
                <Text className="text-lg font-medium text-center flex-1">Profil</Text>
                <View className="w-6" />
            </View>

            {/* Section d'information du profil */}
            <View className="px-5 mt-4">
                <Text className="text-3xl font-semibold text-gray-900">Mettre à jour le profil</Text>
                <View className="flex-row items-center mt-1 mb-6 flex-wrap">
                    <Text className="text-gray-500">Modifiez vos informations personnelles.</Text>
                </View>

                {/* Champ Nom */}
                <View className="mb-5">
                    <Text className="text-xs text-gray-400 mb-1">NOM</Text>
                    <View className="flex-row items-center border-b border-gray-300 pb-2">
                        <TextInput
                            className="flex-1 text-base text-gray-800"
                            value={name}
                            onChangeText={setName}
                            placeholder="Entrez votre nom"
                        />
                    </View>
                </View>

                {/* Champ Email */}
                <View className="mb-5">
                    <Text className="text-xs text-gray-400 mb-1">ADRESSE EMAIL</Text>
                    <View className="flex-row items-center border-b border-gray-300 pb-2">
                        <TextInput
                            className="flex-1 text-base text-gray-800"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Entrez votre email"
                        />
                    </View>
                </View>

                {/* Champ Téléphone */}
                <View className="mb-5">
                    <Text className="text-xs text-gray-400 mb-1">NUMÉRO DE TÉLÉPHONE</Text>
                    <View className="flex-row items-center border-b border-gray-300 pb-2">
                        <TextInput
                            className="flex-1 text-base text-gray-800"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="Entrez votre numéro de téléphone"
                        />
                    </View>
                </View>

                {/* Bouton de mise à jour */}
                <TouchableOpacity className="bg-blue-800 py-4 rounded-lg mb-4"
                    onPress={handleUpdateProfile}
                    disabled={isLoading}>
                    <Text className="text-white text-center font-medium">METTRE À JOUR</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
