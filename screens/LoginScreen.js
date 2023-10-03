import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient   className="flex-1"
    colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
    start={{ x: 1, y: 0 }}
    end={{ x: 0, y: 0 }}>
    <View className="flex-1 bg-white">
        
      <SafeAreaView  className="flex ">
       
        <View  className="flex-row justify-center">
          <Image source={require('../assets/images/welcome.png')} 
          style={{width: 200, height: 180}} />
        </View>
        
      </SafeAreaView>
      
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
      
      <View  className="flex-row justify-center">
          <Image source={require('../assets/images/easy.png')} 
          style={{width:150, height: 30, marginBottom: 30}} />
        </View>
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="password"
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity >
                 <LinearGradient className="py-3 rounded-xl"
                  colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}>
                <Text 
                    className="text-xl font-bold text-center" style={{color:themeColors.bg_light}}
                >
                        Login
                </Text>
                </LinearGradient>
             </TouchableOpacity>
            
          </View>
          <View className="flex-row justify-center" style={{marginTop: 10}}>
              <Text className="text-gray-500 font-semibold">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
          </View>
          <Text className="text-center text-gray-500" style={{fontSize:14, margin: 20}}>Or continue with</Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../assets/icons/apple.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" />
            </TouchableOpacity>
          </View>
    
          
      </View>
    </View>
    
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 22,
    marginBottom: 60,
    color: themeColors.bg_dark,
  },
});