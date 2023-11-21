import React, { useState } from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView
} from "react-native";

import { useTheme } from '../theme/ThemeProvider';

import AppTextInput from "../components/AppTextInput";

import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';


const LanguageScreen = ({ navigation: { navigate } }) => {

    const navigation = useNavigation();
    const { width } = Dimensions.get('screen');
    const inputWidth = (width - 50) / 2;
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ flex:1, backgroundColor: colors.bg }}>
            <ScrollView>
                <View
                    style={{
                        padding: 10 * 2,
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 30,
                        }}
                    >
                        <Text
                            style={{

                                color: colors.purple,
                                marginVertical: 20,
                                fontSize: 30,
                                fontWeight: 600
                            }}
                        >
                            Preferências
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                maxWidth: "90%",
                                lineHeight: 20,
                                textAlign: "center",
                                color: colors.text_secondary
                            }}
                        >
                            Responda essas perguntas para identificarmos qual são suas preferências
                        </Text>
                    </View>
                    <View
                        style={{
                            marginVertical: 10 * 3,
                        }}
                    >
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
                            <AppTextInput placeholder="Idade" customStyles={{ width: inputWidth }} />
                            <AppTextInput placeholder="Estado" customStyles={{ width: inputWidth }} />
                        </View>
                        <AppTextInput placeholder="Deseja girias?" />
                        <AppTextInput placeholder="Deseja expressões regionais?" />
                        <AppTextInput placeholder="Tem dislexia?" />
                        <AppTextInput placeholder="Grau acadêmico" />

                    </View>
                    <TouchableOpacity style={{ margin: 20 }}>
                        <LinearGradient className="py-3 rounded-xl"
                            colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}>
                            <Text
                                className="text-xl font-bold text-center" style={{ color: '#F5F5F5' }}
                                onPress={() => navigation.navigate('Tab')}
                            >
                                Salvar
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LanguageScreen;
