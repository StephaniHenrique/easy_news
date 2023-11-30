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

export default function LoginScreen() {

  const navigation = useNavigation();
  const { width } = Dimensions.get('screen');
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
      // console.log('Email:', email);
      // console.log('Password:', password);

      const updatedData = { email, password};

      // console.log('Updated data:', updatedData);
      fetch('http://192.168.0.29:8080/user/authenticate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
      })
      .then(response => {
          if(response.ok) {
              navigation.navigate('Tab');
              console.log('Usuario logado com sucesso!');
          } else if(response.status === 403) {
              console.log('Email ou senha incorretos!');
          } else {
              throw new Error('Erro no login!');
          }
      })
      .catch(error => {
          console.error('Erro no login:', error);
      });
  }

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
              marginTop: 40,
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            Login
          </Text>
          <Text
            style={{
              color: colors.text_secondary,
              fontSize: 18,
              maxWidth: "70%",
              textAlign: "center",
            }}
          >
            Acesse agora para ver suas noticias favoritas!
          </Text>
        </View>
        <View
          style={{
            marginTop: 10 * 3,
          }}
        >
          <AppTextInput placeholder="Email" onChangeText={(value) => setEmail(value)}/>
          <AppTextInput placeholder="Password" onChangeText={(value) => setPassword(value)}/>
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              color: colors.purple,
              alignSelf: "flex-end",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Forgot your password ?
          </Text>
        </View>
        <TouchableOpacity style={{ marginTop: 20, marginBottom: 10 }}>
          <LinearGradient className="py-3 rounded-xl"
            colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}>
            <Text
              className="text-xl font-bold text-center" style={{ color: '#F5F5F5' }}
              onPress={() => handleLogin()}
            >
              Login
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
            Ainda não tem uma conta? <Text style={{ color: colors.purple }}   onPress={() => navigation.navigate("SignUp")}>Cadastre-se</Text>
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
              Or continue with
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
  );
}
