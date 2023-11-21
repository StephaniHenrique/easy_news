import React, { useState } from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    ScrollView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from '../theme/ThemeProvider';

import AppTextInput from "../components/AppTextInput";

import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function WelcomeScreen() {

    const navigation = useNavigation();
    const { width } = Dimensions.get('screen');
    const { height } = Dimensions.get("window");
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ display: "flex", justifyContent: "center", height: "100%", backgroundColor: colors.bg }}>
            <View>
                <Image
                    style={{
                        height: height / 2.5,
                        width: "100%"
                    }}
                    resizeMode="contain"
                    source={require("../assets/images/welcome-img.png")}
                />
                <View
                    style={{
                        paddingHorizontal: 10 * 4,
                        paddingTop: 10 * 4,
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: 600,
                            color: colors.purple,
                            textAlign: "center",
                            width: "80%",

                        }}
                    >
                        Fique por dentro das noticias!
                    </Text>

                    <Text
                        style={{
                            fontSize: 14,
                            color: colors.text_secondary,
                            lineHeight: 20,
                            letterSpacing: 1.4,
                            textAlign: "center",
                            marginTop: 10 * 2,
                        }}
                    >
                        Explore todas as noticias de forma simples e personalizada pra você
                    </Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: 10 * 2,
                        paddingTop: 10 * 6,
                        flexDirection: "row",
                        gap: 16
                    }}
                >
                    <TouchableOpacity style={{ width: "48%"}} onPress={() => navigation.navigate("Login")}>
                        <LinearGradient style={{
                            paddingVertical: 13,
                            paddingHorizontal: 13 * 2,
                            borderRadius: 10,
                        }}
                            colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}>
                            <Text
                                className="text-xl font-bold text-center" style={{ color: '#F5F5F5' }}
                            >
                                Login
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "48%" }} onPress={() => navigation.navigate("SignUp")}>
                        <LinearGradient style={{ borderRadius: 10 }}
                            colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}>
                            <View
                                style={{
                                    backgroundColor: colors.bg,
                                    margin: 3, 
                                    borderRadius: 8,
                                    paddingVertical: 10,
                                    paddingHorizontal: 10 * 2
                                }}>
                                <Text
                                    className="text-xl font-bold text-center" style={{ color: colors.purple_pink }}
                                >
                                    Cadastrar
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
