import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, AsyncStorageValue } from "@/constants/Backend";
import { useDataContext } from "@/context/DataContext";

export default function AccountSettingsScreen() {
  const { state, dispatch } = useDataContext();
  const [pushNotifications, setPushNotifications] = useState(state.user?.push_Notification || false);
  const [smsNotifications, setSmsNotifications] = useState(state.user?.smsNotification || false);
  const [promotionalNotifications, setPromotionalNotifications] = useState(state.user?.promotional_Notification || false);

  const accountSettings = [
    {
      id: "profile",
      icon: "person-outline",
      title: "Informations du profil",
      description: "Modifier les informations de votre compte",
    },
    {
      id: "password",
      icon: "lock-closed-outline",
      title: "Changer le mot de passe",
      description: "Modifier votre mot de passe",
    },
    {
      id: "locations",
      icon: "location-outline",
      title: "Emplacements",
      description: "Ajouter ou supprimer vos lieux de livraison",
    },
    {
      id: "pets",
      icon: "paw-outline",
      title: "Mes animaux",
      description: "Ajouter ou modifier les informations de vos animaux",
    },
  ];

  const notificationSettings = [
    {
      id: "push",
      icon: "notifications-outline",
      title: "Notifications push",
      description: "Recevez des mises à jour quotidiennes",
      value: pushNotifications,
      onValueChange: async () => {
        try {
          dispatch({
            type: "UPDATE_USER",
            payload: { push_Notification: !pushNotifications },
          });
          let newNotification = !pushNotifications;
          setPushNotifications((prev) => !prev);

          const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
          const response = await fetch(`${API.BASE_URL}${API.UPDATE_PROFILE}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
              push_Notification: newNotification,
            }),
          });

          if (!response.ok) {
            setPushNotifications((prev) => !prev);
            throw new Error("Échec de la mise à jour des notifications push");
          }
        } catch (error) {
          console.error("Erreur lors de la mise à jour des notifications push :", error);
        }
      },
    },
    {
      id: "sms",
      icon: "notifications-outline",
      title: "Notifications SMS",
      description: "Recevez des mises à jour quotidiennes",
      value: smsNotifications,
      onValueChange: async () => {
        dispatch({
          type: "UPDATE_USER",
          payload: { smsNotification: !smsNotifications },
        });
        let newNotification = !smsNotifications;
        setSmsNotifications((prev) => !prev);

        const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
        const response = await fetch(`${API.BASE_URL}${API.UPDATE_PROFILE}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            smsNotification: newNotification,
          }),
        });

        if (!response.ok) {
          setSmsNotifications((prev) => !prev);
          throw new Error("Échec de la mise à jour des notifications SMS");
        }
      },
    },
    {
      id: "promo",
      icon: "notifications-outline",
      title: "Notifications promotionnelles",
      description: "Recevez des offres et promotions",
      value: promotionalNotifications,
      onValueChange: async () => {
        dispatch({
          type: "UPDATE_USER",
          payload: { promotional_Notification: !promotionalNotifications },
        });
        let newNotification = !promotionalNotifications;
        setPromotionalNotifications((prev) => !prev);

        const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
        const response = await fetch(`${API.BASE_URL}${API.UPDATE_PROFILE}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            promotional_Notification: newNotification,
          }),
        });

        if (!response.ok) {
          setPromotionalNotifications((prev) => !prev);
          throw new Error("Échec de la mise à jour des notifications promotionnelles");
        }
      },
    },
  ];

  const moreSettings = [
    {
      id: "rate",
      icon: "star-outline",
      title: "Noter l'application",
      description: "Évaluez-nous sur le Play Store ou l'App Store",
    },
    {
      id: "faq",
      icon: "document-text-outline",
      title: "FAQ",
      description: "Questions fréquemment posées",
    },
    {
      id: "logout",
      icon: "log-out-outline",
      title: "Déconnexion",
      description: "",
    },
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.id}
      className="flex-row items-center py-4 border-b border-gray-100"
      onPress={() => {
        if (item.id === "logout") {
          Alert.alert(
            "Déconnexion",
            "Voulez-vous vraiment vous déconnecter ?",
            [
              { text: "Annuler", style: "cancel" },
              {
                text: "Se déconnecter",
                onPress: async () => {
                  try {
                    await AsyncStorage.removeItem(AsyncStorageValue.userToken);
                    router.navigate('auth/login');
                    dispatch({ type: "RESET" });
                   
                  } catch (error) {
                    console.error("Erreur lors de la déconnexion:", error);
                    Alert.alert("Erreur", "Impossible de vous déconnecter, essayez à nouveau.");
                  }
                },
              },
            ]
          );
        }
        else if (item.id === "profile") {
          router.navigate('settings/profileInfo');
        } else if (item.id === "password") {
          router.navigate('settings/changePassword');
        } else if (item.id === "payment") {
          router.navigate('settings/paymentMethod');
        } else if (item.id === "locations") {
          router.navigate('settings/locations');
        } else if (item.id === "faq") {
          router.navigate('settings/FAQScreen');
        } else if (item.id === "pets") {
          router.navigate('settings/petsScreen');
        } else {
          console.log(`Appuyé sur ${item.title}`);
        }
      }}
    >
      <View className="w-10 items-center">
        <Ionicons name={item.icon} size={24} color="#6b7280" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-base font-medium text-gray-800">
          {item.title}
        </Text>
        {item.description ? (
          <Text className="text-sm text-gray-500">{item.description}</Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6b7280" />
    </TouchableOpacity>
  );

  const renderNotificationItem = (item) => (
    <View
      key={item.id}
      className="flex-row items-center py-4 border-b border-gray-100"
    >
      <View className="w-10 items-center">
        <Ionicons name={item.icon} size={24} color="#6b7280" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-base font-medium text-gray-800">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-500">{item.description}</Text>
      </View>
      <Switch
        trackColor={{ false: "#e5e7eb", true: "#1e40af" }}
        thumbColor="#ffffff"
        ios_backgroundColor="#e5e7eb"
        onValueChange={item.onValueChange}
        value={item.value}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1 px-6">
        <View className="mt-4 mb-2">
          <Text className="text-3xl font-semibold text-gray-900">
            Paramètres du compte
          </Text>
          <Text className="text-gray-500 mt-1">
            Modifiez vos paramètres tels que les notifications, le profil, etc.
          </Text>
        </View>

        <View className="mt-4">{accountSettings.map(renderSettingItem)}</View>

        <View className="mt-8">
          <Text className="text-base font-medium text-gray-500 mb-2">
            NOTIFICATIONS
          </Text>
          {notificationSettings.map(renderNotificationItem)}
        </View>

        <View className="mt-8 mb-8">
          <Text className="text-base font-medium text-gray-500 mb-2">PLUS</Text>
          {moreSettings.map(renderSettingItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
