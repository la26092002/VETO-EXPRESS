import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDataContext } from "@/context/DataContext";
import { router } from "expo-router";
import { API, AsyncStorageValue } from "@/constants/Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
export default function PanierScreen() {
  const { state, dispatch } = useDataContext();
  const products = state.serviceVendeurSelectioner?.products || [];

useEffect(() => {
  
console.log(state.serviceVendeurSelectioner?.type)
  
}, [])


const handleConfirmCommande = async () => {
  const produits = state.serviceVendeurSelectioner?.products || [];
  const vendeurId = state.serviceVendeurSelectioner?.vendeurId;

  if (!vendeurId || produits.length === 0) {
    alert("Aucun produit sélectionné.");
    return;
  }

  Alert.alert(
    "Confirmation",
    "Êtes-vous sûr de vouloir confirmer la commande ?",
    [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Confirmer",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);

            const body = {
              vendeurId,
              produits: produits.map((p) => ({
                productId: p.id,
                nom: p.name,
                prix: p.price,
                productImage: p.image.uri,
                quantity: p.quantity,
              })),
              type: state.serviceVendeurSelectioner?.type,
              ServiceLivraisonPar: "VetoMoov",
            };

            const response = await fetch(`${API.BASE_URL}/api/client/creerServiceVente`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });

            const result = await response.json();

            if (response.ok) {
              alert("Commande confirmée avec succès !");
              // Optional: clear state or navigate somewhere
              
              dispatch({
                type: "UPDATE_Service_Vendeur_Selectioner",
                payload: {
                  vendeurId: null,
                  vendeur: null,
                  type: null,
                  serviceId: null,
                  products: [],
                }
              });
              router.push("historique");
            } else {
              console.error("Erreur lors de la confirmation:", result.message);
              alert("Échec de la confirmation : " + result.message);
            }
          } catch (err) {
            console.error("Erreur réseau:", err);
            alert("Erreur réseau. Veuillez réessayer.");
          }
        },
      },
    ]
  );
};


  const handleRemoveItem = (productId) => {
    dispatch({
      type: "REMOVE_PRODUCT_FROM_VENDEUR_SELECTIONER",
      payload: productId,
    });
  };

  const totalPrice = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row justify-between items-center my-4">
        <Text className="text-2xl font-semibold text-gray-800">Panier</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-gray-300 px-4 py-2 rounded-lg"
        >
          <Text className="text-gray-800 font-semibold">Retour</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {products.length > 0 ? (
          <>
            {products.map((product, index) => (
              <View
                key={index}
                className="flex-row items-center bg-gray-50 rounded-xl mb-4 p-4 shadow-sm"
              >
                <Image
                  source={product.image}
                  className="w-20 h-20 rounded-lg mr-4"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-lg font-medium text-gray-800">
                    {product.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Prix unitaire: {product.price} €
                  </Text>
                  <Text className="text-sm text-gray-500 mb-2">
                    Quantité: {product.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() => handleRemoveItem(product.id)}
                    className="bg-red-500 px-4 py-2 rounded-lg"
                  >
                    <Text className="text-white text-center font-semibold">
                      Supprimer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View className="mt-4 mb-8 bg-gray-100 rounded-xl p-4">
              <Text className="text-xl font-semibold text-gray-800">
                Total: {totalPrice.toFixed(2)} €
              </Text>
              <TouchableOpacity
                onPress={handleConfirmCommande}
                className="bg-amber-500 mt-4 py-3 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">
                  Confirmer la commande
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text className="text-center text-gray-500 mt-8">
            Votre panier est vide.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
