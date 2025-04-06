import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useDataContext } from "@/context/DataContext";
import { router, useLocalSearchParams } from "expo-router";

export default function TopServicesScreen() {

    const { state } = useDataContext();

  // Service categories that will be displayed as cards
  const serviceCategories = [
    {
      id: 1,
      name: "Special Pet\nServices",
      image: require("@/assets/images/photo_1.jpg"),
      location: "DZ",
      area: "blida",
    },
    {
      id: 2,
      name: "Pet\nGrooming",
      image: require("@/assets/images/photo_2.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 3,
      name: "Food",
      image: require("@/assets/images/photo_3.jpg"),
      location: "DZ",
      area: "oran",
    },
    {
      id: 4,
      name: "Pet\nTraining",
      image: require("@/assets/images/photo_4.jpg"),
      location: "DZ",
      area: "mascara",
    },
    {
      id: 5,
      name: "Veterinary\nServices",
      image: require("@/assets/images/photo_5.jpg"),
      location: "DZ",
      area: "blida",
    },
    {
      id: 6,
      name: "Special Pet\nServices",
      image: require("@/assets/images/photo_1.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 7,
      name: "Pet\nGrooming",
      image: require("@/assets/images/photo_2.jpg"),
      location: "DZ",
      area: "blida",
    },
    {
      id: 8,
      name: "Food",
      image: require("@/assets/images/photo_3.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 9,
      name: "Pet\nTraining",
      image: require("@/assets/images/photo_4.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 10,
      name: "Veterinary\nServices",
      image: require("@/assets/images/photo_5.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 11,
      name: "Special Pet\nServices",
      image: require("@/assets/images/photo_1.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 12,
      name: "Pet\nGrooming",
      image: require("@/assets/images/photo_2.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 13,
      name: "Food",
      image: require("@/assets/images/photo_3.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 14,
      name: "Pet\nTraining",
      image: require("@/assets/images/photo_4.jpg"),
    },
    {
      id: 15,
      name: "Veterinary\nServices",
      image: require("@/assets/images/photo_5.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 16,
      name: "Special Pet\nServices",
      image: require("@/assets/images/photo_1.jpg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 17,
      name: "Pet\nGrooming",
      image: require("@/assets/images/photo_2.jpg"),
      location: "DZ",
      area: "Algiers",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />


      {/* Header */}
           <View className="flex-row items-center justify-between px-4 py-3">
             <TouchableOpacity onPress={() => router.back()}>
               <Ionicons name="chevron-back" size={24} color="black" />
             </TouchableOpacity>
             <Text className="text-lg font-medium text-center flex-1">Top Doctors</Text>
             <View className="w-6" />
           </View>

      {/* Top Services Title */}
      <View className="px-6 mb-4">
        <Text className="text-2xl font-semibold text-gray-900">
          Top Doctors
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Service Categories Grid */}
        <View className="flex-row flex-wrap justify-between px-6">
          {state.doctors.map((service, index) => (
            <TouchableOpacity key={service.userId} className="w-[48%] mb-6">
              {/* Service Image */}
              <View className="rounded-xl overflow-hidden mb-2">
                <Image
                  source={require("@/assets/images/photo_2.jpg")}
                  className="w-full h-40"
                  resizeMode="cover"
                />
              </View>

              {/* Service Name */}
              <Text className="text-lg font-medium text-gray-900 mb-1">
                {service.nomEtablissement}
              </Text>

              {/* Location Info */}
              <View className="flex-row items-center">
                <Text className="text-base text-gray-700">
                FR
                </Text>
                <View className="w-1 h-1 rounded-full bg-gray-400 mx-2" />
                <Text className="text-base text-gray-500"> {service.adresseMap}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
