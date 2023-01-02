import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather, Ionicons } from '@expo/vector-icons';

import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import Home from '../Screens/Home';
import MapScreen from '../Screens/MapScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CommentsScreen from '../Screens/CommentsScreen';
import CreatePostsScreen from '../Screens/CreatePostsScreen';
import PostsScreen from '../Screens/PostsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const useRoute = (isStack) => {
  if (!isStack) {
    return (
      <Stack.Navigator>
      <Stack.Screen   
      options={{
          headerShown: false,
        }} 
        name='Main'
        component={RegistrationScreen}
        />
      <Stack.Screen  
      options={{
          headerShown: false,
        }}
         name='LoginForm' 
         component={LoginScreen} 
         />
      <Stack.Screen
            options={{
              headerShown: false,
            }} 
            name='Home' 
            component={Home}
             />
    </Stack.Navigator>
        );
      }
      return (
        <Tab.Navigator 
        tabBarOptions={{ 
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#212121',
          showLabel: false,
          }}
          >
        <Tab.Screen
        options={{
          headerRight: () => (
            <MaterialCommunityIcons
              name='logout'
              size={24}
              color='#BDBDBD'
              style={{ marginRight: 10 }}
            />
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <View
            style={{
              width: 70,
              height: 40,
              borderRadius: 20,
              backgroundColor: focused ? '#FF6C00' : 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name='grid-outline' size={24} color={color} />
            <MaterialCommunityIcons
              name='postage-stamp'
              size={size}
              color={color}
            />
            </View>
            ),
            }}
         name='PostsScreen'
        component={PostsScreen} 
        />
        <Tab.Screen
        options={{
           tabBarIcon: ({ focused, size, color }) => (
            <View
            style={{
              width: 70,
              height: 40,
              borderRadius: 20,
              backgroundColor: focused ? '#FF6C00' : 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name='add-outline' size={24} color={color} />
              <AntDesign 
              name='pluscircleo' 
              size={35} 
              color={color} 
              />
                 </View>
           ),
        }} 
          name='CreatePostsScreen' 
          component={CreatePostsScreen} 
          />
        <Tab.Screen
                options={{
                  tabBarIcon: ({ focused, size, color }) => (
                    <View
                    style={{
                      width: 70,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: focused ? '#FF6C00' : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Feather name='user' size={24} color={color} />
                    <MaterialCommunityIcons
                      name='face-profile'
                       size={size}
                      color={color}
                    />
                             </View>
                  ),
                }} 
                name='ProfileScreen'
                component={ProfileScreen} 
                />
        <Tab.Screen name='MapScreen' component={MapScreen} />
        <Tab.Screen name='CommentsScreen' component={CommentsScreen} />
      </Tab.Navigator>
        );
      };

export default function Navigate() {
  const routing = useRoute({});
  return <NavigationContainer>{routing}</NavigationContainer>;
}
