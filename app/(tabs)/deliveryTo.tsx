import React from "react";
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
import {} from "react-native-svg";
import BannerSvgComponent from "@/components/banner";
export default function HomeScreen() {
  // Delivery partners data
  const deliveryPartners = [
    {
      id: "1",
      name: "Yalidine",
      location: "Oran,Algeria",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/yalidine.png"),
    },
    {
      id: "2",
      name: "ZR Express",
      location: "Senia - Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/zr.jpeg"),
    },
    {
      id: "3",
      name: "Yalidine",
      location: "Oran,Algeria",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/yalidine.png"),
    },
    {
      id: "4",
      name: "ZR Express",
      location: "Senia - Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/zr.jpeg"),
    },
    {
      id: "5",
      name: "Yalidine",
      location: "Oran,Algeria",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/yalidine.png"),
    },
    {
      id: "6",
      name: "ZR Express",
      location: "Senia - Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/zr.jpeg"),
    },
  ];

  // Best doctors data
  const bestDoctors = [
    {
      id: "1",
      name: "Mohamed",
      location: "Senia -Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/photo_1.jpg"),
    },
    {
      id: "2",
      name: "Noor",
      location: "Imama-Tlemcen",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/photo_2.jpg"),
    },
    {
      id: "3",
      name: "Ahmed",
      location: "Senia -Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/photo_3.jpg"),
    },
    {
      id: "4",
      name: "Leila",
      location: "Imama-Tlemcen",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/photo_4.jpg"),
    },
    {
      id: "5",
      name: "Karim",
      location: "Senia -Oran",
      rating: "4.5",
      time: "25min",
      freeDelivery: true,
      image: require("@/assets/images/photo_5.jpg"),
    },
  ];

  // Render delivery partner card
  const renderDeliveryPartner = ({ item }) => (
    <TouchableOpacity className="mr-4 w-40">
      <View className="mb-2">
        <Image
          source={item.image}
          className="w-full  rounded-lg"
          resizeMode="contain"
        />
      </View>
      <Text className="font-medium text-base">{item.name}</Text>
      <Text className="text-gray-500 text-sm">{item.location}</Text>
      <View className="flex-row items-center mt-1">
        <View className="bg-blue-800 rounded-md px-2 py-1 mr-2">
          <Text className="text-white text-xs">{item.rating}</Text>
        </View>
        <Text className="text-gray-500 text-xs">{item.time}</Text>
        <Text className="text-gray-500 text-xs mx-1">•</Text>
        <Text className="text-gray-500 text-xs">Free delivery</Text>
      </View>
    </TouchableOpacity>
  );

  // Render doctor card
  const renderDoctor = ({ item }) => (
    <TouchableOpacity className="mr-4 w-40">
      <View className="mb-2">
        <Image
          source={item.image}
          className="w-40 h-28 rounded-lg"
          resizeMode="cover"
        />
      </View>
      <Text className="font-medium text-base">{item.name}</Text>
      <Text className="text-gray-500 text-sm">{item.location}</Text>
      <View className="flex-row items-center mt-1">
        <View className="bg-blue-800 rounded-md px-2 py-1 mr-2">
          <Text className="text-white text-xs">{item.rating}</Text>
        </View>
        <Text className="text-gray-500 text-xs">{item.time}</Text>
        <Text className="text-gray-500 text-xs mx-1">•</Text>
        <Text className="text-gray-500 text-xs">Free delivery</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-5 py-2 border-b border-gray-200">
        <Text className="text-center text-gray-500 text-xs">DELIVERY TO</Text>
        <View className="flex-row items-center justify-center px-4 py-3 ">
          <TouchableOpacity className="w-max flex-row items-center justify-center flex-1 ">
            <Text className=" text-center text-xl font-medium text-gray-800">
              HayStreet, Perth
            </Text>
            <Ionicons name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-base font-medium text-gray-800">Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Main Banner Image */}
        <View className="mx-5 my-4">
          <Image
            source={require("@/assets/images/header.jpg")} // Replace with actual image
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Delivery Partners Section */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mx-5 mb-3">
            <Text className="text-2xl font-bold">Delevery Partners</Text>
            <TouchableOpacity>
              <Text className="text-amber-500">See all</Text>
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

        {/* Free Delivery Promo */}
        <View className="mx-5 my-4 bg-white rounded-lg relative">
          <BannerSvgComponent />
          <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center   flex flex-col items-start justify-center p-4">
            <Text className=" text-4xl font-bold font-yuGothic mb-3">
              Free Delivery for 1 Month!
            </Text>
            <Text className=" text-2xl font-yuGothic text-center  font-semibold ">
              You’ve to order at least $10 for using free delivery for 1 month.
            </Text>
          </View>
        </View>

        {/* Best Doctor Section */}
        <View className="my-4">
          <View className="flex-row justify-between items-center mx-5 mb-3">
            <Text className="text-2xl font-bold ">Best Doctor</Text>
            <TouchableOpacity>
              <Text className="text-amber-500">See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={bestDoctors}
            renderItem={renderDoctor}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
