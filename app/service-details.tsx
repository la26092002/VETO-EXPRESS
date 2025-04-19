import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDataContext } from "@/context/DataContext";
import { API, AsyncStorageValue, ServiceLivraisonPar } from "@/constants/Backend";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native"; // Add this import at the top

import { useFocusEffect } from '@react-navigation/native'; // Import this

const serviceInfo = {
  header: {
    title: "Service",
    backText: "Retour",
  },
  heroImage: {
    source: require("@/assets/images/photo_1.jpg"),
    alt: "Services vétérinaires",
  },
  servicesTitle: {
    main: "Services Vétérinaires",
    seeAll: "Voir tout",
  },
  categories: [
    {
      id: ServiceLivraisonPar.Urgence,
      name: ServiceLivraisonPar.Urgence,
      comment: "Cette offre est destinée aux urgences",
    },
    {
      id: ServiceLivraisonPar.VetoLib,
      name: ServiceLivraisonPar.VetoLib,
      comment: "Cette offre peut prendre jusqu'à 2 jours",
    },
    {
      id: ServiceLivraisonPar.VetoMoov,
      name: ServiceLivraisonPar.VetoMoov,
      comment: "Cette offre peut prendre quelques minutes + livraison par notre société",
    },
  ],
  styles: {
    categoryButton: "border border-blue-500 rounded-lg my-2 py-4 w-[80%]",
    categoryText: "text-blue-500 text-center font-medium",
  },
};

export default function VeterinaryServicesScreen() {
  const { state, dispatch } = useDataContext();

  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inside your component
  useFocusEffect(
    React.useCallback(() => {
      const fetchPets = async () => {
        try {
          const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
          const res = await fetch(`${API.BASE_URL}${API.getAllPets}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setPets(data.pets || []);
        } catch (err) {
          console.error("Error fetching pets:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPets();
    }, []) // Empty dependency array ensures this only runs when the screen is focused
  );
  

  const handleServiceSelection = (category) => {
    setSelectedService(category.name);
  };

  const handleNext = async () => {
    const selectedPet = pets.find(p => p.petId === selectedPetId);

    dispatch({
      type: "UPDATE_Service_Consultation_Selectioner",
      payload: {
        petId: selectedPetId,
        petName: selectedPet.petName,
        ServiceLivraisonPar: selectedService,
      },
    });

    const payload = {
      docteurId: state.serviceConsultationSelectioner?.docteurId,
      type: state.serviceConsultationSelectioner?.type,
      ServiceLivraisonPar: selectedService,
      pet: {
        petName: selectedPet.petName,
        petType: selectedPet.petType,
        petAge: selectedPet.petAge,
      },
    };

    try {
      const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);

      const response = await fetch(`${API.BASE_URL}${API.creerServiceConsultation}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return;
      }

      const result = await response.json();
      console.log("API Success:", result);

      dispatch({
        type: "UPDATE_Service_Consultation_Selectioner",
        payload: {
          serviceId: result.service.serviceId,
        },
      });

      // Show success alert with logo and navigate on press
      Alert.alert(
        "✅ Succès",
        "Vous avez fait avec succès !",
        [
          {
            text: "Continuer",
            onPress: () => router.push("serviceConsultation/serviceConsultationDetails"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Failed to create consultation:", error);
    }
  };






  return (
    <SafeAreaView className="flex-1 bg-white p">
      <StatusBar barStyle="dark-content" />

      {/* En-tête */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">
          {serviceInfo.header.title}
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1">
        {/* Image principale */}
        <View className="mx-5 my-8 rounded-lg overflow-hidden">
          <Image
            source={serviceInfo.heroImage.source}
            className="w-full h-56 rounded-lg"
            resizeMode="cover"
            accessibilityLabel={serviceInfo.heroImage.alt}
          />
        </View>

        <View className="mx-5 my-2">
          <Text className="text-xl font-semibold text-gray-800">
            {state.serviceConsultationSelectioner?.type}
          </Text>
          <Text className="text-sm text-gray-600 mt-1">
            Docteur : {state.serviceConsultationSelectioner?.docteur}
          </Text>
        </View>


        {/* 🐶 Pets Section */}
        <View className="mx-5">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Sélectionnez un animal :
          </Text>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : pets.length === 0 ? (
            <View>
              <Text className="text-sm text-gray-500 mb-2">Aucun animal trouvé.</Text>
              <TouchableOpacity
                onPress={() => router.push("settings/petsScreen")} // remplace "/pets/add" par le bon chemin vers l'écran d'ajout
                className="py-3 px-4 bg-blue-500 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">Ajouter un animal</Text>
              </TouchableOpacity>
            </View>
          ) : (
            pets.map((pet) => (
              <TouchableOpacity
                key={pet.petId}
                onPress={() => setSelectedPetId(pet.petId)}
                className={`border rounded-lg p-3 mb-2 ${selectedPetId === pet.petId
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-300"
                  }`}
              >
                <Text className="text-base font-medium">{pet.petName}</Text>
                <Text className="text-xs text-gray-600">{pet.petType} - {pet.petAge} ans</Text>
              </TouchableOpacity>
            ))
          )}
        </View>


        {/* Section Titre */}
        {/* 🩺 Services Section */}
        <View className="mx-5 my-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            {serviceInfo.servicesTitle.main}
          </Text>

          <View className="flex flex-wrap flex-row justify-between">
            {serviceInfo.categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleServiceSelection(category)}
                disabled={!selectedPetId}
                className={`w-[48%] mb-4 p-4 rounded-xl shadow-sm border transition-all ${selectedService === category.name
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-300 bg-white"
                  }`}
              >
                <Text className="text-center text-base font-semibold text-gray-800">
                  {category.name}
                </Text>
                <Text className="text-xs text-gray-500 text-center mt-1">
                  {category.comment}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {/* ✅ Next Button */}
        <View className="mx-5 mt-8 mb-16">
          <TouchableOpacity
            onPress={handleNext}
            disabled={!selectedPetId || !selectedService}
            className={`py-4 rounded-lg ${selectedPetId && selectedService
              ? "bg-amber-500"
              : "bg-gray-300"
              }`}
          >
            <Text className="text-center text-white font-semibold text-base">
              Suivant
            </Text>
          </TouchableOpacity>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
