import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen ({ route }) {
  console.log('route.params.location', route.params.location);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };
  useEffect(() => {
    userLocation();
  }, []);
  return (
  <View style={styles.container}>
      <View>
        <MapView 
        style={styles.map} 
        refion={mapRegion}
        mapType='standard'
        minZoomLevel={7}
        showsUserLocation={true}
        >
          {mapRegion && (
            <Marker
              coordinate={mapRegion}
              title='I am here'
              description='Hello'
            />
          )}
        </MapView>
      </View>
      <Button title='Get Location' onPress={userLocation} />
  </View>
);
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 30,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

