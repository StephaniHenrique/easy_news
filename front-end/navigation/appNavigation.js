import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailScreen from '../screens/DetailScreen';
import FileDetailScreen from '../screens/FileDetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PremiumScreen from '../screens/PremiumScreen';
import CartaoScreen from '../screens/CartaoScreen';
import Tabs from './tab';
import LanguageScreen from '../screens/LanguageScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="Language" options={{headerShown:false}} component={LanguageScreen}/>
        <Stack.Screen name="Tab" options={{headerShown: false}} component={Tabs} />
        <Stack.Screen name="FileDetail" options={{headerShown: false}} component={FileDetailScreen}/>
        <Stack.Screen name="Detail" options={{headerShown: false}} component={DetailScreen}/>
        <Stack.Screen name="Favorite" options={{headerShown: false}} component={FavoriteScreen}/>
        <Stack.Screen name="Premium" options={{headerShown:false }} component={PremiumScreen}/>
        <Stack.Screen name="Cartao" options={{headerShown: false}} component={CartaoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}