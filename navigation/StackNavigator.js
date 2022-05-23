import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/login';
import Signup from '../screens/Signup/signup';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Sign Up" component={Signup} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="StackHome"
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
