import React, { useState } from 'react'
import { Switch, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, SafeAreaViewBase } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../theme/ThemeProvider';


export default function ConfigScreen() {
    const [isEnabled, setIsEnabled] = useState(false);

    const { dark, colors, setScheme } = useTheme();

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        dark ? setScheme('light') : setScheme('dark')
    };

    const styles = {
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        header: {
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
        },
        card: {
            backgroundColor: colors.bg_secondary,
            marginHorizontal: 20,
            marginTop: 30,
            borderRadius: 15,
            elevation: 15,
            padding: 20
        },
        list: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 15
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
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text_main }}>Configurações</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.card}>
                    <View style={{ borderBottomColor: colors.grey2, borderBottomWidth: 2, paddingBottom: 10 }}>
                        <Text style={{ fontWeight: 600, fontSize: 20, color: colors.text_main }}>Por que ser Premium?</Text>
                    </View>
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
                </View>

                <View style={[styles.card, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }]} >
                    <Text style={{ fontWeight: 600, fontSize: 16, color: colors.text_main }}>EasyNews Free</Text>
                    <Text style={{ color: colors.grey }}>Mudar plano</Text>
                </View>

                <View style={{ marginHorizontal: 25, marginTop: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text_main }}>Preferências</Text>
                    <View style={styles.listOptionSpace}>
                        <View style={styles.listOption}>
                            <Ionicons style={{ color: colors.text_main }} name={'contrast-sharp'} size={25} />
                            <Text style={{ color: colors.text_main }}>Dark Mode</Text>
                        </View>
                        <Switch
                            trackColor={{ false: colors.grey, true: colors.grey2 }}
                            thumbColor={colors.purple}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>

                    <View style={[styles.listOptionSpace, { marginTop: 10 }]}>
                        <View style={styles.listOption}>
                            <Ionicons style={{ color: colors.text_main }} name={'options-sharp'} size={25} />
                            <Text style={{ color: colors.text_main }}>Ajustar preferências</Text>
                        </View>
                        <Ionicons style={{ color: colors.text_main }} name={'chevron-forward-outline'} size={25} />
                    </View>

                    <View style={styles.listOptionSpace}>
                        <View style={styles.listOption}>
                            <Ionicons style={{ color: colors.text_main }} name={'chatbox-ellipses-outline'} size={25} />
                            <Text style={{ color: colors.text_main }}>Linguagem</Text>
                        </View>
                        <Ionicons style={{ color: colors.text_main }} name={'chevron-forward-outline'} size={25} />
                    </View>

                    <View style={styles.listOptionSpace}>
                        <View style={styles.listOption}>
                            <Ionicons style={{ color: colors.text_main }} name={'information-circle-outline'} size={25} />
                            <Text style={{ color: colors.text_main }}>Politica e privacidade</Text>
                        </View>

                        <Ionicons style={{ color: colors.text_main }} name={'chevron-forward-outline'} size={25} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}






