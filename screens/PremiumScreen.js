import React, { useState, useEffect } from 'react'
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/ThemeProvider';

import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from '../theme'

const { width } = Dimensions.get('screen');
const cardWidth = width - 40;

const PremiumScreen = ({ navigation }) => {
    
    const { colors } = useTheme();

    const styles = {
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        header: {
            marginTop: 50,
            marginBottom: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
        },
        card: {
            marginBottom: 20,
            width: cardWidth,
            borderRadius: 15,
            backgroundColor: colors.bg_secondary,
            display: 'flex',
            flexDirection: 'column',
            elevation: 8
        },
        header_card: {
            borderBottomColor: colors.grey2,
            borderBottomWidth: 2,
        },
        title: {
            padding: 20,
            paddingBottom: 10,
            fontSize: 18,
            fontWeight: 600,
            color: colors.text_secondary
        },
        space_card: {
            padding: 20,
        },
        price: {
            fontSize: 22,
            fontWeight: 600,
            color: colors.text_main
        },
        desc: {
            color: colors.grey
        },
        subtext: {
            color: colors.text_secondary,
            fontWeight: 600,
            marginBottom: 10,
        },
        list: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 15,
            paddingHorizontal: 20,
        },
        textList: {
            color: colors.grey,
            fontWeight: 600,
            fontSize: 16
        },
        listOptionSpace: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            marginTop: 15,
            justifyContent: 'space-between'
        },
        listOption: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
        },
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                    <Icon
                        name="arrow-back-ios"
                        size={20}
                        color={colors.text_main}
                        onPress={navigation.goBack}
                    />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text_main }}>Assinatura premium</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.list}>
                        <Ionicons name={'checkmark-sharp'} size={28} color={colors.purple} style={{ fontWeight: 'bold' }} />
                        <Text style={styles.textList}>Leituras ilimitadas</Text>
                    </View>
                    <View style={styles.list}>
                        <Ionicons name={'checkmark-sharp'} size={28} color={colors.purple} />
                        <Text style={styles.textList}>Transforme arquivos ilimitados</Text>
                    </View>
                    <View style={styles.list}>
                        <Ionicons name={'checkmark-sharp'} size={28} color={colors.purple} />
                        <Text style={styles.textList}>Noticias de última mão</Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: colors.text_main }}>Escolha seu plano</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.card}>
                        <View style={styles.header_card}>
                            <Text style={styles.title}>Individual</Text>
                        </View>
                        <View style={styles.space_card}>
                            <Text style={styles.desc}>Mensalmente</Text>
                            <Text style={styles.price}>R$ 20,00/Mês</Text>
                            <Text style={styles.subtext}>Tenha um mês grátis</Text>
                            <Text style={styles.desc}>Descrição curtinha, info breve</Text>
                        </View>
                        <TouchableOpacity style={{ margin: 20 }}>
                            <LinearGradient className="py-3 rounded-xl"
                                colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}>
                                <Text
                                    className="text-xl font-bold text-center" style={{ color: themeColors.bg }}
                                    onPress={() => navigation.navigate('Cartao')}
                                >
                                    Assinar
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.header_card}>
                            <Text style={styles.title}>Universitário</Text>
                        </View>
                        <View style={styles.space_card}>
                            <Text style={styles.desc}>Mensalmente</Text>
                            <Text style={styles.price}>R$ 20,00/Mês</Text>
                            <Text style={styles.subtext}>Tenha um mês grátis</Text>
                            <Text style={styles.desc}>Descrição curtinha, info breve</Text>
                        </View>
                        <TouchableOpacity style={{ margin: 20 }}>
                            <LinearGradient className="py-3 rounded-xl"
                                colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}>
                                <Text
                                    className="text-xl font-bold text-center" style={{ color: themeColors.bg }}
                                    onPress={() => navigation.navigate('Cartao')}
                                >
                                    Assinar
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PremiumScreen;
