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
import { Navigate } from './navigate';

import * as SplashScreen from 'expo-splash-screen';
import { AppLoading } from 'expo';

import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import Home from './Screens/Home';
import MapScreen from './Screens/nestedScreens/MapScreen';
import ProfileScreen from './Screens/ProfileScreen';
import CommentsScreen from './Screens/nestedScreens/CommentsScreen';
import CreatePostsScreen from './Screens/CreatePostsScreen';
import PostsScreen from './Screens/PostsScreen';
import DefaultSreenPosts from './Screens/nestedScreens/DefaultScreenPosts';

const image = require('./assets/images/PhotoBG.jpg'); 

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
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
  // const routing = useRoute(true);
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
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        >
               <RegistrationScreen />
              <LoginScreen />
              <Home />
              <CreatePostsScreen />
              <PostsScreen />
              <ProfileScreen />
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