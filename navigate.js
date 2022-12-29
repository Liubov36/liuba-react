import React from 'react';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={RegistrationScreen} />
        <Stack.Screen name='LoginForm' component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
