import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { ServiceType, ServiceVenteType } from "@/constants/Backend";
import { router } from "expo-router";
import { useDataContext } from "@/context/DataContext";

// Services array using the service types
const services = [
  {
    id: 1,
    name: ServiceType.DemandeRdv,
    image: require("@/assets/images/photo_1.jpg"),
    location: "topServiceDoctor",
  },
  {
    id: 2,
    name: ServiceType.ConsultationSuivi,
    image: require("@/assets/images/photo_2.jpg"),
    location: "topServiceDoctor",
  },
  {
    id: 3,
    name: ServiceType.RdvRapide,
    image: require("@/assets/images/photo_3.jpg"),
    location: "topServiceDoctor",
  },
  {
    id: 4,
    name: ServiceVenteType.ProduitVeterinaire,
    image: require("@/assets/images/photo_4.jpg"),
    location: "topServiceVendeur",
  },
  {
    id: 5,
    name: ServiceVenteType.ProduitAnimalerie,
    image: require("@/assets/images/photo_5.jpg"),
    location: "topServiceVendeur",
  },
  // Add more services as needed
];
export default function TabTwoScreen() {

  const { dispatch } = useDataContext();


  const navigation = useNavigation();
  const renderService = ({ item }) => (
    <TouchableOpacity
      className="flex-1 m-2 h-40 bg-white rounded-2xl border border-gray-200 items-center justify-center shadow-sm overflow-hidden relative"
      onPress={() => {

        
        dispatch({
          type: "UPDATE_Service_Consultation_Selectioner",
          payload: {
            type: item.name,
            
          }
        });

        dispatch({
          type: "UPDATE_Service_Vendeur_Selectioner",
          payload: {
            type: item.name,
          }
        });

        

        router.push(`/${item.location}?location=${item.location}`)
      }}
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
        Notre service
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
