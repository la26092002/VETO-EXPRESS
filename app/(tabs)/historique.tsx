import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, AsyncStorageValue } from '@/constants/Backend';
import { useDataContext } from '@/context/DataContext';
import { router } from 'expo-router';


// Replace with actual token or use context/secure storage

const HistoriqueScreen = () => {
  const [choix, setChoix] = useState("consultations");
  const [consultations, setConsultations] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  const { state, dispatch } = useDataContext();


  const [achats, setAchats] = useState([]);
  const [achatPage, setAchatPage] = useState(1);
  const [achatHasMore, setAchatHasMore] = useState(true);

  const fetchAchats = async () => {
    if (loading || !achatHasMore) return;

    setLoading(true);
    try {
      const URL = `http://35.181.18.120:3000/api/client/afficherServiceVenteClient`;
      const TOKEN = await AsyncStorage.getItem(AsyncStorageValue.userToken);
      const res = await fetch(`${URL}?page=${achatPage}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setAchats(prev => [...prev, ...data.services]);
        setAchatHasMore(data.page < data.totalPages);
        setAchatPage(prev => prev + 1);
      } else {
        console.error('Failed to fetch achats:', data);
      }
    } catch (error) {
      console.error('Error fetching achats:', error);
    } finally {
      setLoading(false);
    }
  };


  const fetchConsultations = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const URL = `${API.BASE_URL}${API.afficherServiceConsultationClient}`;
      const TOKEN = await AsyncStorage.getItem(AsyncStorageValue.userToken);
      const res = await fetch(`${URL}?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setConsultations(prev => [...prev, ...data.consultations]);
        setHasMore(data.page < data.totalPages);
        setPage(prev => prev + 1);
      } else {
        console.error('Failed to fetch consultations:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (choix === "consultations" && consultations.length === 0) {
      fetchConsultations();
    } else if (choix === "achats" && achats.length === 0) {
      fetchAchats();
    }
  }, [choix]);

  const renderConsultation = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("gggg")
        dispatch({
          type: "UPDATE_Service_Consultation_Selectioner",
          payload: {
            serviceId: item.serviceId,
          },
        });

        router.push("serviceConsultation/serviceConsultationDetails")
      }

      }


    >

      <View className="bg-white p-4 mb-3 rounded-lg shadow">
        <Text className="font-bold text-gray-800">{item.type}</Text>
        <Text className="text-sm text-gray-600">Animal: {item.pet.petName} ({item.pet.petType}, {item.pet.petAge} ans)</Text>
        <Text className="text-sm text-gray-600">Docteur: {item.docteur.nom}</Text>
        <Text className="text-sm text-gray-600">Livraison: {item.ServiceLivraisonPar}</Text>
        <Text className="text-sm text-gray-500">Statut: {item.status}</Text>
        <Text className="text-xs text-gray-400 mt-1">
          {format(new Date(item.createdAt), "dd MMM yyyy - HH:mm", { locale: fr })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="small" color="#f59e0b" className="my-4" />;
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmé":
        return "text-blue-600";
      case "En cours":
        return "text-yellow-600";
      case "Terminé":
        return "text-green-600";
      case "Annulé":
      case "Échoué":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const renderAchat = ({ item }) => {
    const total = item.produits.reduce(
      (sum, p) => sum + p.prix * p.quantity,
      0
    );

    return (
      <View className="bg-white p-4 mb-3 rounded-lg shadow">
        <Text className="font-bold text-gray-800">Type: {item.type}</Text>
        <View className={`px-2 py-1 rounded-full bg-gray-100 ${getStatusColor(item.status)}`}>
          <Text className="text-xs font-semibold">{item.status}</Text>
        </View>
        <Text className="text-sm text-gray-600">Vendeur: {item.vendeur.nom}</Text>


        {item.produits.map((produit, index) => (
          <View key={index} className="mt-2">
            <Text className="text-sm text-gray-700">Produit: {produit.nom}</Text>
            <Text className="text-sm text-gray-600">Quantité: {produit.quantity}</Text>
            <Text className="text-sm text-gray-600">Prix: {produit.prix} €</Text>
            {/* Optional: Show image
            <Image
              source={{ uri: produit.productImage }}
              style={{ width: 80, height: 80, borderRadius: 8 }}
              resizeMode="cover"
            />
            */}
          </View>
        ))}

        <Text className="text-sm text-gray-800 mt-2">Total: {total} €</Text>
        <Text className="text-sm text-gray-500">Livraison: {item.ServiceLivraisonPar}</Text>
        <Text className="text-xs text-gray-400 mt-1">
          {format(new Date(item.createdAt), "dd MMM yyyy - HH:mm", { locale: fr })}
        </Text>
      </View>
    );
  };


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <Text className="text-3xl font-bold mt-6 mb-8 text-gray-900">
          Historique des transactions
        </Text>

        <View className="flex-row justify-around mb-4">
          <TouchableOpacity onPress={() => setChoix("consultations")}>
            <Text className={`text-lg ${choix === "consultations" ? "font-bold text-amber-600" : "text-gray-500"}`}>
              Consultations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChoix("achats")}>
            <Text className={`text-lg ${choix === "achats" ? "font-bold text-amber-600" : "text-gray-500"}`}>
              Achats
            </Text>
          </TouchableOpacity>
        </View>


        <FlatList
          data={choix === "consultations" ? consultations : achats}
          keyExtractor={(item, index) => (choix === "consultations" ? item.serviceId : item.serviceId) + index}
          renderItem={choix === "consultations" ? renderConsultation : renderAchat}
          onEndReached={() => {
            if (choix === "consultations") fetchConsultations();
            else if (choix === "achats") fetchAchats();
          }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            !loading && (
              <Text className="text-center text-gray-500 mt-10">
                Aucun {choix === "consultations" ? "consultation" : "achat"} trouvé.
              </Text>
            )
          }
        />


      </View>
    </SafeAreaView>
  );
};

export default HistoriqueScreen;
