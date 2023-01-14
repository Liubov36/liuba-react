import React, { useState } from 'react';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import { AppLoading } from 'expo';

import { store } from './redux/store';
import db from './src/firebase/config';

import Navigate from './src/navigate';
import MapScreen from './src/Screens/nestedScreens/MapScreen';
import CommentsScreen from './src/Screens/nestedScreens/CommentsScreen';
import DefaultSreenPosts from './src/Screens/nestedScreens/DefaultScreenPosts';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const [iasReady, setIasReady] = useState(false);
  const [user, setUser] = useState(null);

  db.auth().onAuthStateChanged((user) => setUser(user));

  const routing = useRoute(true);
  if (!iasReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    );
  }
    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground style={styles.image} source={image}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        >
          <Navigate />
              <MapScreen />
              <CommentsScreen />
              <DefaultSreenPosts />
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style='auto' />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});