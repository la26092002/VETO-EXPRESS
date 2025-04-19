import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BannerSvgComponent from "@/components/banner";
import { useDataContext } from "@/context/DataContext";
import { router } from "expo-router";

export default function HomeScreen() {
  const { state, dispatch } = useDataContext();



  const deliveryPartners = [
    {
      id: "1",
      name: "Yalidine",
      location: "Oran, Algérie",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/yalidine.png"),
    },
    {
      id: "2",
      name: "ZR Express",
      location: "Sénia - Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/zr.jpeg"),
    },
    {
      id: "3",
      name: "Yalidine",
      location: "Oran, Algérie",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/yalidine.png"),
    },
    {
      id: "4",
      name: "ZR Express",
      location: "Sénia - Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/zr.jpeg"),
    },
    {
      id: "5",
      name: "Yalidine",
      location: "Oran, Algérie",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/yalidine.png"),
    },
    {
      id: "6",
      name: "ZR Express",
      location: "Sénia - Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/zr.jpeg"),
    },
  ];

  const renderDeliveryPartner = ({ item }) => (
    <TouchableOpacity className="mr-4 w-40">
      <View className="mb-2">
        <Image source={item.image} className="w-full rounded-lg" resizeMode="contain" />
      </View>
      <Text className="font-medium text-base">{item.name}</Text>
      <Text className="text-gray-500 text-sm">{item.location}</Text>
      <View className="flex-row items-center mt-1">
        <View className="bg-blue-800 rounded-md px-2 py-1 mr-2">
          <Text className="text-white text-xs">{item.rating}</Text>
        </View>
        <Text className="text-gray-500 text-xs">{item.time}</Text>
        <Text className="text-gray-500 text-xs mx-1">•</Text>
        <Text className="text-gray-500 text-xs">Livraison gratuite</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDoctor = ({ item }) => (
    <TouchableOpacity className="mr-4 w-40">
      <View className="mb-2">
        <Image
          source={require(`@/assets/images/photo_1.jpg`)}
          className="w-40 h-28 rounded-lg"
          resizeMode="cover"
        />
      </View>
      <Text className="font-medium text-base">{item.nom}</Text>
      <Text className="text-gray-500 text-sm">{item.adresseMap}</Text>
      <View className="flex-row items-center mt-1">
        <View className="bg-blue-800 rounded-md px-2 py-1 mr-2">
          <Text className="text-white text-xs">4.5</Text>
        </View>
        <Text className="text-gray-500 text-xs">25min</Text>
        <Text className="text-gray-500 text-xs mx-1">•</Text>
        <Text className="text-gray-500 text-xs">Livraison gratuite</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* En-tête */}
      <View className="px-5 py-2 border-b border-gray-200">
        <Text className="text-center text-gray-500 text-xs">LIVRAISON À</Text>
        <View className="flex-row items-center justify-center px-4 py-3">
          <TouchableOpacity
            className="w-max flex-row items-center justify-center flex-1"
            onPress={() => {
              router.push("/settings/locations");
            }}
          >
            <Text className="text-center text-xl font-medium text-gray-800">
              {state.user?.adresseMap}
            </Text>
            <Ionicons name="navigate-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Bannière principale */}
        <View className="mx-5 my-4">
          <Image
            source={require("@/assets/images/header.jpg")}
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Partenaires de livraison */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mx-5 mb-3">
            <Text className="text-2xl font-bold">Partenaires de livraison</Text>
            <TouchableOpacity>
              <Text className="text-amber-500">Voir tout</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={deliveryPartners}
            renderItem={renderDeliveryPartner}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          />
        </View>

        {/* Promo Livraison Gratuite */}
        <View className="mx-5 my-4 bg-white rounded-lg relative">
          <BannerSvgComponent />
          <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-start justify-center p-4">
            <Text className="text-4xl font-bold font-yuGothic mb-3">
              Livraison gratuite pendant 1 mois !
            </Text>
            <Text className="text-2xl font-yuGothic text-center font-semibold">
              Commandez pour au moins 10 $ afin de bénéficier d'une livraison gratuite pendant 1 mois.
            </Text>
          </View>
        </View>

        {/* Meilleurs médecins */}
        <View className="my-4">
          <View className="flex-row justify-between items-center mx-5 mb-3">
            <Text className="text-2xl font-bold">Meilleurs Médecins</Text>
            <TouchableOpacity>
              <Text className="text-amber-500">Voir tout</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={state.doctors}
            renderItem={renderDoctor}
            keyExtractor={(item) => item.userId}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
