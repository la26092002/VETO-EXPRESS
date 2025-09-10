import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, AsyncStorageValue } from "@/constants/Backend";
import { useDataContext } from "@/context/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Linking from "expo-linking"; // Pour ouvrir Google Maps



export default function ServiceConsultationDetails() {
  const { state, dispatch } = useDataContext();
  const [loading, setLoading] = useState(true);
  const [consultation, setConsultation] = useState(null);



  // Fonction pour ouvrir la map native
  const openGoogleMaps = () => {
    const latitude = consultation.docteur?.userLatitude || 36.7525; // Remplace avec les vraies coordonnées
    const longitude = consultation.docteur?.userLongitude || 3.042; // Remplace avec les vraies coordonnées
    const label = "Docteur";
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${label}`;
    Linking.openURL(url);
  };
  useEffect(() => {
    const fetchServiceDetails = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const serviceId = state.serviceConsultationSelectioner?.serviceId;

      if (!serviceId) return;

      try {
        const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);

        const response = await fetch(
          `${API.BASE_URL}${API.getServiceConsultationById}${serviceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setConsultation(data.consultation);
      } catch (error) {
        console.error("Error fetching consultation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text className="mt-4 text-gray-600">Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (!consultation) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 font-semibold">
          Aucune donnée de consultation trouvée.
        </Text>
      </SafeAreaView>
    );
  }

  const infoRows = [
    { label: "Docteur", value: `${consultation.docteur?.nom}` },
    { label: "Email", value: consultation.docteur?.email },
    {
      label: "Téléphone",
      value: (
        <TouchableOpacity 
      onPress={() => Linking.openURL(`tel:${consultation.docteur?.telephone}`)}
      className="flex-row items-center space-x-2"
    >
      <Ionicons name="call" size={18} color="#4CAF50" />
      <Text className="text-green-600 font-semibold ">
        {consultation.docteur?.telephone}
      </Text>
    </TouchableOpacity>
      ),
    },
    { label: "Service", value: consultation?.type },
     { 
    label: "Date Rdv", 
    value: consultation?.dateRdv 
      ? new Date(consultation.dateRdv).toLocaleString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Non défini",
  },
    
    
    
    { label: "Statut", value: consultation?.status },
    { label: "Livraison", value: consultation?.ServiceLivraisonPar },
    { label: "Animal", value: consultation.pet?.petName },
    { label: "Type d'animal", value: consultation.pet?.petType },
    { label: "Âge", value: `${consultation.pet?.petAge} ans` },
    {
      label: "Créé le",
      value: new Date(consultation.createdAt).toLocaleString(),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.push("/historique")}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">Détails</Text>
        <View className="w-6" />
      </View>

      <ScrollView>
        {/* Image top */}
        <View className="mx-5 my-6 rounded-lg overflow-hidden">
          <Image
            source={require("@/assets/images/photo_1.jpg")}
            className="w-full h-56 rounded-lg"
            resizeMode="cover"
            accessibilityLabel="Consultation vétérinaire"
          />
        </View>

        {/* Details section */}
        <View className="mx-5 mb-8">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Informations de la consultation
          </Text>

          {infoRows.map((row, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-3"
            >
              <Text className="text-gray-700 font-medium">{row.label}</Text>
              <Text className="text-gray-600 text-right">{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Action buttons */}

        <View className="mx-5 mb-16">
          <TouchableOpacity
            onPress={openGoogleMaps}
            className="bg-emerald-600 py-4 rounded-lg"
            style={{ marginBottom: 12 }}
          >
            <Text className="text-white text-center font-semibold text-base">
              Ouvrir dans Google Maps
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
