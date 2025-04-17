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
  // State for toggle switches
  const [pushNotifications, setPushNotifications] = useState(state.user?.push_Notification || false);
  const [smsNotifications, setSmsNotifications] = useState(state.user?.smsNotification || false);
  const [promotionalNotifications, setPromotionalNotifications] = useState(state.user?.promotional_Notification || false);


  // Settings categories
  const accountSettings = [
    {
      id: "profile",
      icon: "person-outline",
      title: "Profile Information",
      description: "Change your account information",
    },
    {
      id: "password",
      icon: "lock-closed-outline",
      title: "Change Password",
      description: "Change your password",
    },

    {
      id: "locations",
      icon: "location-outline",
      title: "Locations",
      description: "Add or remove your delivery locations",
    },
    
    {
      id: "pets",
      icon: "paw-outline",
      title: "My Pets",
      description: "Add or update information about your pets",
    },
  ];

  const notificationSettings = [
    {
      id: "push",
      icon: "notifications-outline",
      title: "Push Notifications",
      description: "For daily update you will get it",
      value: pushNotifications,
      onValueChange: async () => {
        try {
          dispatch({
            type: "UPDATE_USER",
            payload: { push_Notification: !pushNotifications },
          });
          let newNotification = !pushNotifications
          setPushNotifications((prev) => !prev)


          const token = await AsyncStorage.getItem(AsyncStorageValue.userToken)
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
            setPushNotifications((prev) => !prev)
            throw new Error("Failed to update push notification setting");
          }
        } catch (error) {
          console.error("Error updating push notification:", error);
        }

      },
    },
    {
      id: "sms",
      icon: "notifications-outline",
      title: "SMS Notifications",
      description: "For daily update you will get it",
      value: smsNotifications,
      onValueChange: async () => {
        dispatch({
          type: "UPDATE_USER",
          payload: { smsNotification: !smsNotifications },
        });
        let newNotification = !smsNotifications
        setSmsNotifications((prev) => !prev)


        const token = await AsyncStorage.getItem(AsyncStorageValue.userToken)
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
          setSmsNotifications((prev) => !prev)
          throw new Error("Failed to update push notification setting");
        }

      },
    },
    {
      id: "promo",
      icon: "notifications-outline",
      title: "Promotional Notifications",
      description: "For daily update you will get it",
      value: promotionalNotifications,
      onValueChange: async () => {
        dispatch({
          type: "UPDATE_USER",
          payload: { promotional_Notification: !promotionalNotifications },
        });
        let newNotification = !promotionalNotifications
        setPromotionalNotifications((prev) => !prev)



        const token = await AsyncStorage.getItem(AsyncStorageValue.userToken)
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
          setPromotionalNotifications((prev) => !prev)
          throw new Error("Failed to update push notification setting");
        }

      },
    },
  ];

  const moreSettings = [
    {
      id: "rate",
      icon: "star-outline",
      title: "Rate Us",
      description: "Rate us playstore, appstor",
    },
    {
      id: "faq",
      icon: "document-text-outline",
      title: "FAQ",
      description: "Frequently asked questions",
    },
    {
      id: "logout",
      icon: "log-out-outline",
      title: "Logout",
      description: "",
    },
  ];

  // Render a setting list item with chevron
  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.id}
      className="flex-row items-center py-4 border-b border-gray-100"
      onPress={() => {
        if (item.id === "logout") {
          Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Logout",
                onPress: async () => {
                  try {
                    await AsyncStorage.removeItem(AsyncStorageValue.userToken);
                    dispatch({ type: "RESET" }); // <-- Optional: If you have a RESET type to clear all user data
                    router.navigate('auth/login');
                  } catch (error) {
                    console.error("Logout Error:", error);
                  }
                },
                style: "destructive",
              },
            ],
            { cancelable: true }
          );
        } else if (item.id === "profile") {
          router.navigate('settings/profileInfo');
          console.log("profileInfo")
        } else if (item.id === "password") {
          router.navigate('settings/changePassword');
          console.log("changePassword")

        } else if (item.id === "payment") {
          router.navigate('settings/paymentMethod');
          console.log("paymentMethod")
        } else if (item.id === "locations") {
          router.navigate('settings/locations');
          console.log("paymentMethod")
        } else if (item.id === "faq") {
          router.navigate('settings/FAQScreen');
          console.log("FAQScreen")
        }else if(item.id === "payment"){
          //settings/paymentCardsScreen
          router.navigate('settings/paymentMethod');
          console.log("paymentCardsScreen")

        }else if(item.id === "pets"){
          router.navigate('settings/petsScreen');
          console.log("petsScreen")
          
        } else {
          // Navigate or handle other settings
          console.log(`Pressed ${item.title}`);
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

  // Render a notification setting with toggle
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
        {/* Header */}
        <View className="mt-4 mb-2">
          <Text className="text-3xl font-semibold text-gray-900">
            Account Settings
          </Text>
          <Text className="text-gray-500 mt-1">
            Update your settings like notifications, payments, profile edit etc.
          </Text>
        </View>

        {/* Account Settings */}
        <View className="mt-4">{accountSettings.map(renderSettingItem)}</View>

        {/* Notifications */}
        <View className="mt-8">
          <Text className="text-base font-medium text-gray-500 mb-2">
            NOTIFICATIONS
          </Text>
          {notificationSettings.map(renderNotificationItem)}
        </View>

        {/* More */}
        <View className="mt-8 mb-8">
          <Text className="text-base font-medium text-gray-500 mb-2">MORE</Text>
          {moreSettings.map(renderSettingItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
