import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { API, AsyncStorageValue } from "@/constants/Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataContext } from "@/context/DataContext";


export default function LoginScreen() {
    // State for form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false); // State for loading

    const { state, dispatch } = useDataContext();

   // Basculer la visibilité du mot de passe
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

useEffect(() => {
    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
            if (token) {
                // Préparer les en-têtes avec le token
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                };

                // Exécuter les requêtes API en parallèle
                const [userRes, doctorsRes, vendeursRes] = await Promise.all([
                    fetch(`${API.BASE_URL}${API.GET_USER}`, { headers }),
                    fetch(`${API.BASE_URL}${API.GET_DOCTORS}`, { headers }),
                    fetch(`${API.BASE_URL}${API.GET_VENDEURS}`, { headers }),
                ]);

                if (userRes.ok && doctorsRes.ok && vendeursRes.ok) {
                    const userData = await userRes.json();
                    const doctorsData = await doctorsRes.json();
                    const vendeursData = await vendeursRes.json();

                    dispatch({ type: "SET_USER", payload: userData });
                    dispatch({ type: "SET_DOCTORS", payload: doctorsData.docteurs });
                    dispatch({ type: "SET_VENDEURS", payload: vendeursData.vendeurs });

                    router.navigate('auth/ChooseLocationScreen');
                } else {
                    await AsyncStorage.removeItem(AsyncStorageValue.userToken);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la lecture du token :', error);
        }
    };

    checkToken();
}, []);

// Gérer la connexion
const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert("Erreur", "Tous les champs sont obligatoires.");
        return;
    }

    setIsLoading(true);
    try {
        const user = {
            email: email,
            password: password,
        };

        console.log("Tentative de connexion avec :", user);

        const response = await fetch(`${API.BASE_URL}${API.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        console.log("Réponse de l'API :", data);

        if (!response.ok) {
            if (response.status === 400 && data.message === 'Email already in use') {
                Alert.alert("Échec de l'inscription", "Cet e-mail est déjà enregistré. Veuillez en utiliser un autre ou vous connecter.");
                await AsyncStorage.setItem('emailValidate', user.email);
                // router.navigate("auth/login");
            } else if (response.status === 401) {
                Alert.alert("Échec de l'inscription", "Ce mot de passe est incorrect. Veuillez en utiliser un autre.");
                await AsyncStorage.setItem('emailValidate', user.email);
                // router.navigate("auth/login");
            } else {
                Alert.alert("Échec de la connexion", data.message || "Échec de la connexion. Veuillez réessayer.");
            }
            return;
        }

        if (data.user.isValidate) {
            if (data.user.typeActeur === "Client") {
                await AsyncStorage.setItem(AsyncStorageValue.userToken, data.token);

                // Préparer les en-têtes avec le token
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                };

                // Exécuter les requêtes API en parallèle
                const [userRes, doctorsRes, vendeursRes] = await Promise.all([
                    fetch(`${API.BASE_URL}${API.GET_USER}`, { headers }),
                    fetch(`${API.BASE_URL}${API.GET_DOCTORS}`, { headers }),
                    fetch(`${API.BASE_URL}${API.GET_VENDEURS}`, { headers }),
                ]);

                const userData = await userRes.json();
                const doctorsData = await doctorsRes.json();
                const vendeursData = await vendeursRes.json();

                dispatch({ type: "SET_USER", payload: userData });
                dispatch({ type: "SET_DOCTORS", payload: doctorsData.docteurs });
                dispatch({ type: "SET_VENDEURS", payload: vendeursData.vendeurs });

                router.navigate("/auth/ChooseLocationScreen");
            } else {
                Alert.alert(data.user.typeActeur, "Ce type d'utilisateur est uniquement pris en charge sur la version Web de l'application.");
            }
        } else {
            Alert.alert("Connexion incomplète", "Veuillez valider votre compte.");
            await AsyncStorage.setItem('emailValidate', user.email);
            router.navigate("auth/validateAccount");
        }

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        Alert.alert("Échec de l'inscription", "Erreur réseau. Veuillez vérifier votre connexion et réessayer.");
    } finally {
        setIsLoading(false);
    }
};


    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            {/* Header with back button and title */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <Text className="text-lg font-medium text-center flex-1">Connexion</Text>
                <View className="w-6" />
            </View>

            {/* Login Section */}
            <View className="px-5 mt-4">
                <Text className="text-3xl font-semibold text-gray-900">Bon retour</Text>
                <View className="flex-row items-center mt-1 mb-6 flex-wrap">
                    <Text className="text-gray-500">Entrez votre e-mail et votre mot de passe pour vous connecter.</Text>
                </View>

                {/* Email Input */}
                <View className="mb-5">
                    <Text className="text-xs text-gray-400 mb-1">ADRESSE E-MAIL</Text>
                    <View className="flex-row items-center border-b border-gray-300 pb-2">
                        <TextInput
                            className="flex-1 text-base text-gray-800"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Entrez votre e-mail"
                        />
                    </View>
                </View>

                {/* Password Input */}
                <View className="mb-8">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xs text-gray-400 mb-1">MOT DE PASSE</Text>
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center border-b border-gray-300 pb-2">
                        <TextInput
                            className="flex-1 text-base text-gray-800"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            placeholder="Entrez votre mot de passe"
                        />
                    </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity className="bg-blue-800 py-4 rounded-lg mb-4"
                    onPress={handleLogin}
                    disabled={isLoading}>
                    <Text className="text-white text-center font-medium">Connexion</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity onPress={() => router.navigate('auth/forgetPassword')}  >
                    <Text className="text-blue-600 text-center mb-6">Mot de passe oublié ?</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View className="flex-row justify-center">
                    <Text className="text-gray-500">Vous n'avez pas de compte ? </Text>
                    <TouchableOpacity onPress={() => router.navigate('auth/createAccount')}>
                        <Text className="text-blue-600 font-medium">S'inscrire</Text>
                    </TouchableOpacity>
                </View>

                {/*
                <Text className="text-gray-500 text-center text-sm mb-6">Ou</Text>

                 Social Login Buttons 
                <TouchableOpacity className="flex-row bg-blue-600 py-3 rounded-lg mb-3 flex justify-around items-center">
                    <View className="bg-white p-1 rounded-sm mr-2">
                        <Image
                            source={require("@/assets/images/facebook.png")}
                            className="w-7 h-7"
                            resizeMode="cover"
                        />
                    </View>
                    <Text className="text-white font-medium">SE CONNECTER AVEC FACEBOOK</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row bg-blue-500 py-3 rounded-lg flex justify-around items-center">
                    <View className="bg-white p-1 rounded-sm mr-2">
                        <Image
                            source={require("@/assets/images/google.png")}
                            className="w-7 h-7"
                            resizeMode="cover"
                        />
                    </View>
                    <Text className="text-white font-medium">SE CONNECTER AVEC GOOGLE</Text>
                </TouchableOpacity>

                */}
            </View>
        </SafeAreaView>
    );
}
