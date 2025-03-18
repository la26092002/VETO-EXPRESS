import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const serviceInfo = {
  header: {
    title: "Service",
    backText: "Back",
  },
  heroImage: {
    source: require("@/assets/images/photo_1.jpeg"),
    alt: "Veterinary services",
  },
  servicesTitle: {
    main: "Veterinary Services",
    seeAll: "See all",
  },
  categories: [
    { id: 1, name: "GENERAL HEALTH CHECK-UPS" },
    { id: 2, name: "VACCINATIONS" },
    { id: 3, name: "SURGERY AND EMERGENCY" },
    { id: 4, name: "DENTAL CARE" },
  ],
  styles: {
    categoryButton: "border border-blue-500 rounded-lg my-2 py-4 w-[80%]",
    categoryText: "text-blue-500 text-center font-medium",
  },
};

export default function VeterinaryServicesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white p">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-center px-4 py-3 border-b border-gray-200">
        <Text className="flex-1 text-center text-base font-medium text-gray-800">
          {serviceInfo.header.title}
        </Text>
        <View className="w-max flex-row items-center justify-center gap-6 ">
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-base font-medium text-gray-800">
              {serviceInfo.header.backText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Hero Image */}
        <View className="mx-5 my-8 rounded-lg overflow-hidden">
          <Image
            source={serviceInfo.heroImage.source}
            className="w-full h-56 rounded-lg"
            resizeMode="cover"
            accessibilityLabel={serviceInfo.heroImage.alt}
          />
        </View>

        {/* Services Title Section */}
        <View className="flex-row justify-between items-center mx-5 my-8">
          <Text className="text-lg font-semibold text-gray-800">
            {serviceInfo.servicesTitle.main}
          </Text>
          <TouchableOpacity>
            <Text className="text-amber-500 text-sm">
              {serviceInfo.servicesTitle.seeAll}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service Categories */}
        <View className="flex flex-col justify-center items-center">
          {serviceInfo.categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className={serviceInfo.styles.categoryButton}
            >
              <Text className={serviceInfo.styles.categoryText}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
