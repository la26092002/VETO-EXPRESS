import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { API, AsyncStorageValue } from "@/constants/Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataContext } from "@/context/DataContext";

export default function ProfileInfoScreen() {
    const { state, dispatch } = useDataContext(); // Getting user data from global state
    const [email, setEmail] = useState(state.user.email || "");
    const [name, setName] = useState(state.user.nom || "");
    const [phone, setPhone] = useState(state.user.telephone || "");
    const [isLoading, setIsLoading] = useState(false);

    // Handle profile update
    const handleUpdateProfile = async () => {
        if (!name || !email || !phone) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        setIsLoading(true);

        try {
            const updatedUser = {
                email: email,
                nom: name,
                telephone: phone,
            };

            const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const response = await fetch(`${API.BASE_URL}${API.UPDATE_PROFILE}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedUser),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Update Failed", data.message || "Failed to update profile.");
                return;
            } else {
                Alert.alert("Success", "Profile updated successfully.");
                // Optionally update the global state or navigate to another screen
                dispatch({ type: 'UPDATE_USER', payload: { ...state.user, ...updatedUser } });
            }


        } catch (error) {
            console.error('Profile update error:', error);
            Alert.alert("Update Failed", "Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-medium text-center flex-1">Profile</Text>
                <View className="w-6" />
            </View>

            {/* Profile Information Section */}
            <View className="px-5 mt-4">
                <Text className="text-3xl font-semibold text-gray-900">Update Profile</Text>
                <View className="flex-row items-center mt-1 mb-6 flex-wrap">
                    <Text className="text-gray-500">Update your personal information.</Text>
                </View>

                {/* Name Input */}
                <View className="mb-5">
                    <Text className="text-xs text-gray-400 mb-1">NAME</Text>
                    <View className="flex-row items-center border-b border-gray-300 pb-2">
                        <TextInput
                            className="flex-1 text-base text-gray-800"
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your name"
                        />
                    </View>
                </View>

                {/* Email Input */}
                <View className="mb-5">
                    <Text className="text-xs text-gray-400 mb-1">EMAIL ADDRESS</Text>
                    <View className="flex-row items-center border-b border-gray-300 pb-2">
                        <TextInput
                            className="flex-1 text-base text-gray-800"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Enter your email"
                        />
                    </View>
                </View>

                {/* Phone Input */}
                <View className="mb-5">
                    <Text className="text-xs text-gray-400 mb-1">PHONE NUMBER</Text>
                    <View className="flex-row items-center border-b border-gray-300 pb-2">
                        <TextInput
                            className="flex-1 text-base text-gray-800"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="Enter your phone number"
                        />
                    </View>
                </View>

                {/* Update Button */}
                <TouchableOpacity className="bg-blue-800 py-4 rounded-lg mb-4"
                    onPress={handleUpdateProfile}
                    disabled={isLoading}>
                    <Text className="text-white text-center font-medium">UPDATE PROFILE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
