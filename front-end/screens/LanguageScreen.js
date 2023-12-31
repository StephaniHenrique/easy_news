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


const LanguageScreen = ({ navigation: { navigate }, route }) => {
    const [age, setAge] = useState('');
    const [state, setState] = useState('');
    const [allowSlang, setAllowSlang] = useState('');
    const [allowRegionalExpressions, setAllowRegionalExpressions] = useState('');
    const [isPcd, setIsPcd] = useState('');
    const [academicDegree, setAcademicDegree] = useState('');
    const [languageData, setLanguageData] = useState({});

    const handleLanguage = () => {
        const { signUpData } = route.params;
        const isPremium = 'false';

        // console.log('Sign up data:', signUpData);
        // console.log('State:', state);
        // console.log('Age:', age);
        // console.log('Allow slang:', allowSlang);
        // console.log('Allow regional expressions:', allowRegionalExpressions);
        // console.log('Is PCD:', isPcd);
        // console.log('Academic degree:', academicDegree);

        setLanguageData({isPremium, age, state, allowSlang, allowRegionalExpressions, academicDegree, isPcd});

        const updatedLanguageData = {
            ...languageData,
            isPremium: isPremium,
            age: age,
            state: state,
            allowSlang: allowSlang,
            allowRegionalExpressions: allowRegionalExpressions,
            academicDegree: academicDegree,
            isPcd: isPcd,
        };

        const combinedData = { ...signUpData, ...updatedLanguageData};

        // console.log('Combined data:', combinedData);
        // console.log(JSON.stringify(combinedData));

        // usar o IPv4 da máquina ao invés do localhost
        // https://stackoverflow.com/questions/60639983/react-native-expo-fetch-throws-network-request-failed
        fetch('http://192.168.0.29:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(combinedData),
        })
        .then(response => {
            if (response.ok) {
                navigation.navigate('Tab');
                console.log('Usuario registrado com sucesso!');
            } else {
                throw new Error('Erro no cadastro!');
            }
        })
        .catch(error => {
            console.error('Erro no cadastro:', error);
        });

    }

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
                            <AppTextInput placeholder="Idade" customStyles={{ width: inputWidth }} onChangeText={(value) => setAge(value)}/>
                            <AppTextInput placeholder="Estado" customStyles={{ width: inputWidth }} onChangeText={(value) => setState(value)}/>
                        </View>
                        <AppTextInput placeholder="Deseja girias?" onChangeText={(value) => setAllowSlang(value)}/>
                        <AppTextInput placeholder="Deseja expressões regionais?" onChangeText={(value) => setAllowRegionalExpressions(value)}/>
                        <AppTextInput placeholder="Tem dislexia?" onChangeText={(value) => setIsPcd(value)}/>
                        <AppTextInput placeholder="Grau acadêmico" onChangeText={(value) => setAcademicDegree(value)}/>
                    </View>
                    <TouchableOpacity style={{ margin: 20 }}>
                        <LinearGradient className="py-3 rounded-xl"
                            colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}>
                            <Text
                                className="text-xl font-bold text-center" style={{ color: '#F5F5F5' }}
                                onPress={() => handleLanguage()}
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
