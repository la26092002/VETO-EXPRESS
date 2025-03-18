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

export default function SearchScreen() {
  // Service categories that will be displayed as cards
  const serviceCategories = [
    {
      id: 1,
      name: "Special Pet\nServices",
      image: require("@/assets/images/photo_1.jpeg"),
      location: "DZ",
      area: "blida",
    },
    {
      id: 2,
      name: "Pet\nGrooming",
      image: require("@/assets/images/photo_2.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 3,
      name: "Food",
      image: require("@/assets/images/photo_3.jpeg"),
      location: "DZ",
      area: "oran",
    },
    {
      id: 4,
      name: "Pet\nTraining",
      image: require("@/assets/images/photo_4.jpeg"),
      location: "DZ",
      area: "mascara",
    },
    {
      id: 5,
      name: "Veterinary\nServices",
      image: require("@/assets/images/photo_5.jpeg"),
      location: "DZ",
      area: "blida",
    },
    {
      id: 6,
      name: "Special Pet\nServices",
      image: require("@/assets/images/photo_1.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 7,
      name: "Pet\nGrooming",
      image: require("@/assets/images/photo_2.jpeg"),
      location: "DZ",
      area: "blida",
    },
    {
      id: 8,
      name: "Food",
      image: require("@/assets/images/photo_3.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 9,
      name: "Pet\nTraining",
      image: require("@/assets/images/photo_4.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 10,
      name: "Veterinary\nServices",
      image: require("@/assets/images/photo_5.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 11,
      name: "Special Pet\nServices",
      image: require("@/assets/images/photo_1.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 12,
      name: "Pet\nGrooming",
      image: require("@/assets/images/photo_2.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 13,
      name: "Food",
      image: require("@/assets/images/photo_3.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 14,
      name: "Pet\nTraining",
      image: require("@/assets/images/photo_4.jpeg"),
    },
    {
      id: 15,
      name: "Veterinary\nServices",
      image: require("@/assets/images/photo_5.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 16,
      name: "Special Pet\nServices",
      image: require("@/assets/images/photo_1.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
    {
      id: 17,
      name: "Pet\nGrooming",
      image: require("@/assets/images/photo_2.jpeg"),
      location: "DZ",
      area: "Algiers",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Page Title */}
      <View className="px-6 pt-4 pb-2">
        <Text className="text-4xl font-bold text-gray-900">Search</Text>
      </View>

      {/* Search Input */}
      <View className="mx-6 mb-6">
        <View className="flex-row items-center px-4 py-3 bg-gray-100 rounded-xl">
          <Ionicons name="search" size={22} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-500"
            placeholder="Search on foodly"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Top Services Title */}
      <View className="px-6 mb-4">
        <Text className="text-2xl font-semibold text-gray-900">
          Top Service
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Service Categories Grid */}
        <View className="flex-row flex-wrap justify-between px-6">
          {serviceCategories.map((service, index) => (
            <TouchableOpacity key={service.id} className="w-[48%] mb-6">
              {/* Service Image */}
              <View className="rounded-xl overflow-hidden mb-2">
                <Image
                  source={service.image}
                  className="w-full h-40"
                  resizeMode="cover"
                />
              </View>

              {/* Service Name */}
              <Text className="text-lg font-medium text-gray-900 mb-1">
                {service.name}
              </Text>

              {/* Location Info */}
              <View className="flex-row items-center">
                <Text className="text-base text-gray-700">
                  {service.location}
                </Text>
                <View className="w-1 h-1 rounded-full bg-gray-400 mx-2" />
                <Text className="text-base text-gray-500">{service.area}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
