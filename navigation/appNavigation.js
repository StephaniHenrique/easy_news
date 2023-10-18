import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import Tabs from './tab';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="Tab" options={{headerShown: false}} component={Tabs} />
        <Stack.Screen name="Detail" options={{headerShown: false}} component={DetailScreen}/>
        <Stack.Screen name="Favorite" options={{headerShown: false}} component={FavoriteScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}