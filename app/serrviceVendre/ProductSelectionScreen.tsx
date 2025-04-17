import { API, AsyncStorageValue, ProductType } from "@/constants/Backend";
import { useDataContext } from "@/context/DataContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_BASE_URL = "http://192.168.1.12:3000";
const IMAGE_BASE_URL = `${API_BASE_URL}/`;

export default function ProductScreen() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const size = 10;

  const { state, dispatch } = useDataContext();

  useEffect(() => {

    console.log(state.serviceVendeurSelectioner?.type)

  }, [])
  const fetchProducts = async (currentPage = 1, append = false) => {
    const userId = state.serviceVendeurSelectioner?.vendeurId;
    const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);

    if (!userId || !token) {
      console.warn("Missing userId or token");
      return;
    }

    try {
      if (currentPage === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await fetch(
        `${API.BASE_URL}/api/client/afficherProduitParUser?userId=${userId}&page=${currentPage}&size=${size}&productType=${state.serviceVendeurSelectioner?.type}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const formattedProducts = data.result.map((item) => ({
          id: item.productId.toString(),
          name: item.productName,
          price: item.productPrice,
          image: { uri: `${API.BASE_URL}/${item.productImage}` },
        }));

        if (append) {
          setProducts((prev) => [...prev, ...formattedProducts]);
        } else {
          setProducts(formattedProducts);
        }

        if (formattedProducts.length < size) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, false);
  }, []);

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const current = prev[productId] || 0;
      const updated = Math.max(0, current + change);
      return { ...prev, [productId]: updated };
    });
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 0;
    if (quantity > 0) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        dispatch({
          type: "ADD_PRODUCT_TO_VENDEUR_SELECTIONER",
          payload: {
            id: parseInt(product.id),
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: quantity,
          },
        });
        alert(`Ajouté ${quantity} x ${product.name} au panier`);
        setQuantities((prev) => ({ ...prev, [productId]: 0 }));


      }
    } else {
      alert("Veuillez sélectionner une quantité");
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, true);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-center flex-1">{state.serviceVendeurSelectioner?.type}</Text>
        <View className="w-6" />
      </View>
      <View className="flex-row justify-between items-center my-4">
        <Text className="text-2xl font-semibold text-gray-800">Produits</Text>
        <TouchableOpacity
          onPress={() => {
            // navigate to the Panier screen here
            console.log("Go to Panier");
            console.log(state.serviceVendeurSelectioner?.products)
            router.push("serrviceVendre/PanierScreen");
          }}
          style={{ backgroundColor: "#B2F5EA" }}
          className="bg-amber-500 px-4 py-2 rounded-lg"
        >
          <Text style={{ color: "#1F2937" }} className="text-white font-semibold">Panier</Text>
        </TouchableOpacity>
      </View>


      <View className="bg-gray-100 rounded-lg px-4 py-2 mb-4">
        <TextInput
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="text-base text-gray-700"
        />
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text className="text-gray-500 mt-4">Chargement des produits...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredProducts.map((product) => (
            <View
              key={product.id}
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
                <Text className="text-sm text-gray-500 mb-2">
                  Prix: {product.price} €
                </Text>

                <View className="flex-row items-center space-x-4 mb-2">
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(product.id, -1)}
                    className="bg-gray-300 px-3 py-1 rounded-lg"
                  >
                    <Text className="text-lg font-bold">−</Text>
                  </TouchableOpacity>
                  <Text className="text-base font-medium">
                    {quantities[product.id] || 0}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(product.id, 1)}
                    className="bg-gray-300 px-3 py-1 rounded-lg"
                  >
                    <Text className="text-lg font-bold">+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => handleAddToCart(product.id)}
                  className="bg-amber-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white text-center font-semibold">
                    Ajouter au panier
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {filteredProducts.length === 0 && (
            <Text className="text-center text-gray-500 mt-8">
              Aucun produit trouvé.
            </Text>
          )}

          {hasMore && (
            <TouchableOpacity
              onPress={handleLoadMore}
              className="bg-gray-200 py-3 rounded-lg mt-4 mb-8 items-center"
            >
              {loadingMore ? (
                <ActivityIndicator color="#f59e0b" />
              ) : (
                <Text className="text-gray-700 font-medium">Charger plus</Text>
              )}
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
