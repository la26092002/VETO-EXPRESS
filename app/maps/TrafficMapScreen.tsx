import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import polyline from '@mapbox/polyline';

export default function FullscreenDriverPlan() {
  const [driverLocation, setDriverLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const destination = {
    latitude: 36.7528, // Algiers
    longitude: 3.0422,
  };

  const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY'; // Replace this with your actual key

  useEffect(() => {
    const getLocationAndRoute = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need location access to show the map.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setDriverLocation(location.coords);
      fetchRoute(location.coords);
    };

    getLocationAndRoute();
  }, []);

  const fetchRoute = async (origin) => {
    const originStr = `${origin.latitude},${origin.longitude}`;
    const destinationStr = `${destination.latitude},${destination.longitude}`;
  
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=${GOOGLE_MAPS_API_KEY}`
      );
  
      if (!res.ok) {
        // If the response status is not OK, throw an error
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      
      // Log the response from the API for debugging
      console.log('API response:', data);
  
      if (data.status === 'OK' && data.routes.length > 0) {
        // Route found, decode the polyline
        const points = polyline.decode(data.routes[0].overview_polyline.points);
        const coords = points.map(([latitude, longitude]) => ({ latitude, longitude }));
        setRouteCoords(coords);
      } else if (data.status === 'ZERO_RESULTS') {
        // No route found
        Alert.alert('No route found', 'Could not find a valid route between the locations.');
        console.log('No route found:', data);
      } else {
        // Handle other error statuses
        Alert.alert('Error', 'Failed to fetch route. Please try again.');
        console.log('API Error:', data);
      }
    } catch (err) {
      // Catch network errors or other errors
      console.error('Error fetching route:', err);
      Alert.alert('Error', 'Failed to fetch route. Please try again.');
    }
  };
  
  
  
  

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />

      {driverLocation && (
        <MapView
          style={{ flex: 1 }}
          showsUserLocation
          initialRegion={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={driverLocation} title="You" pinColor="blue" />
          <Marker coordinate={destination} title="Destination" pinColor="red" />
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={5}
              strokeColor="#1E90FF"
            />
          )}
        </MapView>
      )}

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: 'absolute',
          top: 50,
          left: 20,
          backgroundColor: 'white',
          borderRadius: 30,
          padding: 8,
          elevation: 5,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
