import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from '../theme/ThemeProvider';

import AppTextInput from "../components/AppTextInput";

import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function SignUpScreen() {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [passwordConfirm, setPasswordConfirm] = useState('');
        const [signUpData, setSignUpData] = useState({});
        const handleSignUp = () => {
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Confirm Password:', passwordConfirm);

            // fetch('http://localhost:8080', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(),
            // })
            // .then(response => {
            //     if (response.ok) {
            //         // Handle successful signup
            //         console.log('User signed up successfully!');
            //     } else {
            //         // Handle signup error
            //         throw new Error('Sign up failed');
            //     }
            // })
            // .catch(error => {
            //     // Handle error here
            //     console.error('Error signing up:', error);
            // });

            setSignUpData({name, email, password, passwordConfirm});

            navigation.navigate('Language', {signUpData});
        };

        const navigation = useNavigation();
        const { width } = Dimensions.get('screen');
        const { colors } = useTheme();
        return (
            <SafeAreaView style={{display:"flex", justifyContent:"center", height:"100%", backgroundColor:colors.bg}}>
            <View
              style={{
                padding: 10 * 2,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: colors.purple,
                    marginTop: 30,
                    marginBottom: 20,
                    fontWeight: 600,
                  }}
                >
                  Cadastro
                </Text>
                <Text
                  style={{
                    color: colors.text_secondary,
                    fontSize: 18,
                    maxWidth: "70%",
                    textAlign: "center",
                  }}
                >
                  Crie sua conta e explore as noticias do seu jeito!
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10 * 3,
                }}
              >
                <AppTextInput placeholder="Nome completo" onChangeText={(value) => setName(value)}/>
                <AppTextInput placeholder="E-mail" onChangeText={(value) => setEmail(value)} />
                <AppTextInput placeholder="Senha" onChangeText={(value) => setPassword(value)} />
                <AppTextInput placeholder="Confirmar senha" onChangeText={(value) => setPasswordConfirm(value)} />
              </View>

              <TouchableOpacity style={{ marginTop: 20, marginBottom: 10 }}>
                <LinearGradient className="py-3 rounded-xl"
                  colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}>
                  <Text
                    className="text-xl font-bold text-center" style={{ color: '#F5F5F5' }}
                    onPress={() => handleSignUp()}
                  >
                    Cadastrar
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.grey,
                    fontWeight: 600,
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  Já possui conta? <Text style={{ color: colors.purple }}   onPress={() => navigation.navigate("Login")}>Faça login</Text>
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  marginVertical: 10 * 3,
                }}
              ><View style={{display:"flex", flexDirection: "row", width: "100%", alignItems:"center", justifyContent:"center", gap:10}}>
                  <View style={{borderTopWidth: 1, borderTopColor: colors.grey, width:"28%"}}></View>
                  <Text
                    style={{

                      color: colors.grey,
                      textAlign: "center",
                      fontSize: 14,
                    }}
                  >
                    Ou continue com
                  </Text>
                  <View style={{borderTopWidth: 1,  borderTopColor: colors.grey, width: "28%"}}></View>
                </View>
                <View
                  style={{
                    marginTop: 25,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: colors.grey2,
                      borderRadius: 10 / 2,
                      marginHorizontal: 10,
                    }}
                  >
                    <Ionicons
                      name="logo-google"
                      color={colors.purple}
                      size={25}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor:colors.grey2,
                      borderRadius: 10 / 2,
                      marginHorizontal: 10,
                    }}
                  >
                    <Ionicons
                      name="logo-apple"
                      color={colors.purple}
                      size={25}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor:colors.grey2,
                      borderRadius: 10 / 2,
                      marginHorizontal: 10,
                    }}
                  >
                    <Ionicons
                      name="logo-facebook"
                      color={colors.purple}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        )

}