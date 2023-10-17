import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
  return (
    <LinearGradient   className="flex-1"
    colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
    start={{ x: 1, y: 0 }}
    end={{ x: 0, y: 0 }}>
    <View className="flex-1" >
      <SafeAreaView className="flex">
       
        <View className="flex-row justify-center" style={{height: 70, alignItems: 'flex-end'}}>
            <Text style={{color:themeColors.bg_light, fontFamily:'sans-serif', fontSize:25, fontWeight: 800, marginBottom: 10}}>EASY NEWS</Text>
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
        <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder='Enter Name'
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder='Enter Email'
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                secureTextEntry
                placeholder='Enter Password'
            />
             <Text className="text-gray-700 ml-4">Confirm Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                placeholder='Enter Password'
            
            />
            

                <LinearGradient className="py-3 rounded-xl"
    colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
    start={{ x: 1, y: 0 }}
    end={{ x: 0, y: 0 }}>
                <Text className="font-xl font-bold text-center" style={{color:themeColors.bg_light}}>
                    Sign Up
                </Text>
                </LinearGradient>
        </View>
        <View className="flex-row justify-center" style={{marginTop: 10}}>
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
        </View>
        <Text className="text-center text-gray-500" style={{fontSize:14, margin: 20}}>
            Or continue with
        </Text>
        <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/google.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/apple.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/facebook.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
        </View>

      </View>
    </View>
    </LinearGradient>
  )
}
