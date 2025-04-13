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

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const checkToken = async () => {
            try {

                const token = await AsyncStorage.getItem(AsyncStorageValue.userToken);
                if (token) {
                    // Setup headers with the token
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    };

                    // Perform the API requests in parallel
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

                        router.navigate('/deliveryTo');
                    } else {
                        await AsyncStorage.removeItem(AsyncStorageValue.userToken);
                    }

                }
            } catch (error) {
                console.error('Error reading token:', error);
            }
        };

        checkToken();
    }, []);

    // Handle registration
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        setIsLoading(true);
        try {
            const user = {
                email: email,
                password: password,
            };

            console.log(user)
            const response = await fetch(`${API.BASE_URL}${API.LOGIN}`, { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            console.log(data)
            if (!response.ok) {
                if (response.status === 400 && data.message === 'Email already in use') {
                    Alert.alert("Registration Failed", "This email is already registered. Please use a different email or login.");
                    await AsyncStorage.setItem('emailValidate', user.email);
                    // Navigate to validation screen or home
                    // router.navigate("auth/login");
                }else if(response.status === 401 ){
                    Alert.alert("Registration Failed", "This password is not correct. Please use a different password.");
                    await AsyncStorage.setItem('emailValidate', user.email);
                    // Navigate to validation screen or home
                    // router.navigate("auth/login");
                } else {
                    Alert.alert("Login Failed", data.message || "Login failed. Please try again.");
                }
                return;
            }

            if (data.user.isValidate) {
                if (data.user.typeActeur === "Client") {
                    await AsyncStorage.setItem(AsyncStorageValue.userToken, data.token);

                    // Setup headers with the token
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${data.token}`,
                    };

                    // Perform the API requests in parallel
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


                    router.navigate("/deliveryTo");
                } else {
                    Alert.alert(data.user.typeActeur, "this user just supported on web app service.");
                }
            } else {
                Alert.alert("Login Not Complicated", "Validate your account.");

                await AsyncStorage.setItem('emailValidate', user.email);
                // Navigate to validation screen or home
                router.navigate("auth/validateAccount");
            }
            // Success case


        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert("Registration Failed", "Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            {/* Header with back button and title */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-medium text-center flex-1">Login</Text>
                <View className="w-6" />
            </View>

            {/* Login Section */}
            <View className="px-5 mt-4">
                <Text className="text-3xl font-semibold text-gray-900">Welcome Back</Text>
                <View className="flex-row items-center mt-1 mb-6 flex-wrap">
                    <Text className="text-gray-500">Enter your Email and Password to login.</Text>
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

                {/* Password Input */}
                <View className="mb-8">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xs text-gray-400 mb-1">PASSWORD</Text>
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
                            placeholder="Enter your password"
                        />
                    </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity className="bg-blue-800 py-4 rounded-lg mb-4"
                    onPress={handleLogin}
                    disabled={isLoading}>
                    <Text className="text-white text-center font-medium">LOGIN</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity onPress={() => router.navigate('auth/forgetPassword')}  >
                    <Text className="text-blue-600 text-center mb-6">Forgot Password?</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View className="flex-row justify-center">
                    <Text className="text-gray-500">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.navigate('auth/createAccount')}>
                        <Text className="text-blue-600 font-medium">Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Or Divider */}
                <Text className="text-gray-500 text-center text-sm mb-6">Or</Text>

                {/* Social Login Buttons */}
                <TouchableOpacity className="flex-row bg-blue-600 py-3 rounded-lg mb-3 flex justify-around items-center">
                    <View className="bg-white p-1 rounded-sm mr-2">
                        <Image
                            source={require("@/assets/images/facebook.png")}
                            className="w-7 h-7"
                            resizeMode="cover"
                        />
                    </View>
                    <Text className="text-white font-medium">CONNECT WITH FACEBOOK</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row bg-blue-500 py-3 rounded-lg flex justify-around items-center">
                    <View className="bg-white p-1 rounded-sm mr-2">
                        <Image
                            source={require("@/assets/images/google.png")}
                            className="w-7 h-7"
                            resizeMode="cover"
                        />
                    </View>
                    <Text className="text-white font-medium">CONNECT WITH GOOGLE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
