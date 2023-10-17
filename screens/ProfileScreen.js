import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';



export default function ProfileScreen() {
    const navigation = useNavigation();

  return (
    <LinearGradient 
    colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
    start={{ x: 1, y: 0 }}
    end={{ x: 0, y: 0 }}>
        
</LinearGradient>
  )
}