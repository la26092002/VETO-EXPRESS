import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const consultations = [
  {
    serviceId: "0001",
    docteur: { nom: "Dr. Sarah Lemoine", email: "sarah.lemoine@vetlib.com", telephone: "+213665432198" },
    pet: { petName: "Rex", petType: "Chien", petAge: "4" },
    status: "En cours",
    type: "Demande de rendez-vous",
    ServiceLivraisonPar: "VetoMoov",
    createdAt: "2025-04-14T12:30:00"
  },
  {
    serviceId: "0002",
    docteur: { nom: "Dr. Yacine B.", email: "yacine@vetmoov.dz", telephone: "+213660000000" },
    pet: { petName: "Mimi", petType: "Chat", petAge: "2" },
    status: "Terminé",
    type: "Urgence",
    ServiceLivraisonPar: "Urgence",
    createdAt: "2025-04-10T09:15:00"
  }
];

const achats = [
  {
    id: "A001",
    produit: { nom: "Croquettes Royal Canin", quantite: 2, prixUnitaire: 4500 },
    total: 9000,
    dateAchat: "2025-04-13T18:15:00",
    livraison: "Livré"
  },
  {
    id: "A002",
    produit: { nom: "Litière pour chat", quantite: 1, prixUnitaire: 3500 },
    total: 3500,
    dateAchat: "2025-04-12T15:45:00",
    livraison: "En attente"
  }
];

const HistoriqueScreen = () => {
  const [choix, setChoix] = useState("consultations");

  const renderConsultation = ({ item }) => (
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
  );

  const renderAchat = ({ item }) => (
    <View className="bg-white p-4 mb-3 rounded-lg shadow">
      <Text className="font-bold text-gray-800">{item.produit.nom}</Text>
      <Text className="text-sm text-gray-600">Quantité: {item.produit.quantite}</Text>
      <Text className="text-sm text-gray-600">Prix unitaire: {item.produit.prixUnitaire} DA</Text>
      <Text className="text-sm text-gray-800">Total: {item.total} DA</Text>
      <Text className="text-sm text-gray-500">Livraison: {item.livraison}</Text>
      <Text className="text-xs text-gray-400 mt-1">
        {format(new Date(item.dateAchat), "dd MMM yyyy - HH:mm", { locale: fr })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      
      <View className="flex-1 px-4">
      <Text className="text-3xl font-bold mt-6 mb-8 text-gray-900">
          Derniere transactions
        </Text>
        {/* Onglets */}
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

        {/* Liste */}
        <FlatList
          data={choix === "consultations" ? consultations : achats}
          keyExtractor={(item, index) => (choix === "consultations" ? item.serviceId : item.id) + index}
          renderItem={choix === "consultations" ? renderConsultation : renderAchat}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoriqueScreen;
