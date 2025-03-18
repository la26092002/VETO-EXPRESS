import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
const services = [
  {
    id: 1,
    name: "Special Pet\nServices",
    image: require("@/assets/images/photo_1.jpg"),
  },
  {
    id: 2,
    name: "Pet\nGrooming",
    image: require("@/assets/images/photo_2.jpg"),
  },
  { id: 3, name: "Food", image: require("@/assets/images/photo_3.jpg") },
  {
    id: 4,
    name: "Pet\nTraining",
    image: require("@/assets/images/photo_4.jpg"),
  },
  {
    id: 5,
    name: "Veterinary\nServices",
    image: require("@/assets/images/photo_5.jpg"),
  },
  {
    id: 6,
    name: "Special Pet\nServices",
    image: require("@/assets/images/photo_1.jpg"),
  },
  {
    id: 7,
    name: "Pet\nGrooming",
    image: require("@/assets/images/photo_2.jpg"),
  },
  { id: 8, name: "Food", image: require("@/assets/images/photo_3.jpg") },
  {
    id: 9,
    name: "Pet\nTraining",
    image: require("@/assets/images/photo_4.jpg"),
  },
  {
    id: 10,
    name: "Veterinary\nServices",
    image: require("@/assets/images/photo_5.jpg"),
  },
  {
    id: 11,
    name: "Special Pet\nServices",
    image: require("@/assets/images/photo_1.jpg"),
  },
  {
    id: 12,
    name: "Pet\nGrooming",
    image: require("@/assets/images/photo_2.jpg"),
  },
  { id: 13, name: "Food", image: require("@/assets/images/photo_3.jpg") },
  {
    id: 14,
    name: "Pet\nTraining",
    image: require("@/assets/images/photo_4.jpg"),
  },
  {
    id: 15,
    name: "Veterinary\nServices",
    image: require("@/assets/images/photo_5.jpg"),
  },
  {
    id: 16,
    name: "Special Pet\nServices",
    image: require("@/assets/images/photo_1.jpg"),
  },
  {
    id: 17,
    name: "Pet\nGrooming",
    image: require("@/assets/images/photo_2.jpg"),
  },
];
export default function TabTwoScreen() {
  const navigation = useNavigation();
  const renderService = ({ item }) => (
    <TouchableOpacity
      className="flex-1 m-2 h-40 bg-white rounded-2xl border border-gray-200 items-center justify-center shadow-sm overflow-hidden relative"
      onPress={() => navigation.navigate(item.name)}
    >
      <Image source={item.image} className="w-full h-full object-cover" />
      <View className="absolute inset-0 bg-black opacity-30" />

      <Text className="absolute text-2xl  text-center text-white font-yuGothic ">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <Text className="text-3xl font-bold mt-6 mb-8 text-gray-900">
          Our Service
        </Text>

        <FlatList
          data={services}
          renderItem={renderService}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}
