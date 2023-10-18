import React from 'react'
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from '../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import { themeColors } from '../theme';

export default function ProfileScreen() {
    const { colors } = useTheme();


    const styles = {
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        cardProfile: {
            backgroundColor: colors.bg_secondary,
            marginHorizontal: 20,
            marginTop: 90,
            borderRadius: 15,
            elevation: 15,
            paddingHorizontal: 20
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 100,
            overflow: "hidden",
            borderColor: colors.purple_pink,
            borderWidth: 3,
            marginTop: -45,
            backgroundColor: '#fff'
        },
        premium: {
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            marginTop: -40
        },
        imagePremium: {
            width: 20,
            height: 20,
        },
        infoContainer: {
            marginTop: 16
        },
        statsContainer: {
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 32,
            backgroundColor: colors.bg_ter,
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 15
        },
        statsBox: {
            alignItems: "center",
            flex: 1
        },
        text: {
            color: colors.secondary
        },
        image: {
            flex: 1,
            height: undefined,
            width: undefined
        },
        subText: {
            fontSize: 12,
            color: colors.grey,
            textTransform: "uppercase",
            fontWeight: "500"
        },
        mediaImageContainer: {
            width: 180,
            height: 200,
            borderRadius: 12,
            overflow: "hidden",
            marginHorizontal: 10,
            borderColor: colors.grey2,
            borderWidth: 2
        },
        recent: {
            marginLeft: 25,
            marginTop: 28,
            fontSize: 14,
            color: colors.grey,
            fontWeight: 'bold'
        },
        recentItem: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 16
        },
        activityIndicator: {
            backgroundColor: colors.purple,
            padding: 4,
            height: 12,
            width: 12,
            borderRadius: 6,
            marginTop: 3,
            marginRight: 20
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.cardProfile}>
                    <View style={styles.profileImage}>
                        <Image source={require("../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <LinearGradient style={styles.premium}
                            colors={[colors.purple_03, colors.pink_03]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}>
                            <Ionicons name={'ribbon-sharp'} size={20} color={colors.purple} />
                        </LinearGradient>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: "500", fontSize: 20, color: colors.text_main }]}>Julie</Text>
                        <Text style={[styles.text, { color: colors.grey, fontSize: 16 }]}>julie.blabla@usp.br</Text>
                    </View>
                    <TouchableOpacity style={{ marginVertical: 20 }}>
                        <LinearGradient style={{ borderRadius: 8, paddingVertical: 6 }}
                            colors={[colors.pink, colors.purple_pink, colors.purple]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}>
                            <Text
                                className="text-xl text-center" style={{ color:themeColors.text_main }}
                            >
                                Editar
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 20 }]}>35</Text>
                        <Text style={[styles.text, styles.subText]}>Lidos</Text>
                    </View>
                    <View style={[styles.statsBox]}>
                        <Text style={[styles.text, { fontSize: 20 }]}>12</Text>
                        <Text style={[styles.text, styles.subText]}>Salvos</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 20 }]}>10</Text>
                        <Text style={[styles.text, styles.subText]}>Adicionados</Text>
                    </View>
                </View>


                <Text style={[styles.recent]}>Documentos adicionados</Text>
                <View style={{ marginTop: 15, marginLeft: 20 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/docs.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/docs.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/docs.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                </View>
                <Text style={[styles.recent]}>Atividades recentes</Text>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: colors.text_secondary, fontWeight: "500" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: colors.text_secondary, fontWeight: "500" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 75 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
}


