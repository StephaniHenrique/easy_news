import React, { useState } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Animated, Modal } from "react-native";
import { useTheme } from '../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from '../theme';

import AppTextInput from "../components/AppTextInput";
import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [visible, setVisible] = React.useState(false);


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
        profileImageEdit: {
            width: 100,
            height: 100,
            borderRadius: 100,
            overflow: "hidden",
            borderColor: colors.purple_pink,
            borderWidth: 3,
            backgroundColor: '#fff',
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
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
        },
        modalBackGround: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            width: '80%',
            backgroundColor: colors.bg_secondary,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 15,
            elevation: 20,
        },
    }


    const ModalPoup = ({ visible, children }) => {
        const [showModal, setShowModal] = React.useState(visible);
        const scaleValue = React.useRef(new Animated.Value(0)).current;
        React.useEffect(() => {
            toggleModal();
        }, [visible]);
        const toggleModal = () => {
            if (visible) {
                setShowModal(true);
                Animated.spring(scaleValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            } else {
                setTimeout(() => setShowModal(false), 200);
                Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        };
        return (
            <Modal transparent visible={showModal}>
                <View style={styles.modalBackGround}>
                    <Animated.View
                        style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ModalPoup visible={visible}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: '100%', borderBottomWidth: 1, paddingBottom: 10, borderColor: colors.grey2 }}>
                    <Text style={{ fontSize: 18, fontWeight: 500, color: colors.text_secondary }}>Edite seu perfil</Text>
                    <Ionicons name={'close'} size={22} color={colors.purple} onPress={() => setVisible(false)} />
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", }}>
                        <View style={styles.profileImageEdit}>
                            <Image source={require("../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                        </View>
                        <View style={{
                            backgroundColor:colors.purple_03, 
                            borderRadius: 100, 
                            height:28, 
                            width: 28, 
                            display: "flex", 
                            flexDirection:"row", 
                            alignItems:"center", 
                            justifyContent:"center",
                            marginTop: "30%",
                            marginLeft: -30
                            }}>
                            <Ionicons name={'pencil-outline'} size={16} color={colors.text_main} />
                        </View>
                    </View>

                    <AppTextInput placeholder="Nome" customStyles={{ backgroundColor: colors.bg }} />
                    <LinearGradient style={{ borderRadius: 8, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
                        colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}>
                        <Text
                            style={{ fontWeight: 600, fontSize: 18, color: '#F5F5F5' }}
                        >
                            Salvar
                        </Text>
                    </LinearGradient>
                </View>
            </ModalPoup>

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
                                className="text-xl text-center" style={{ color: themeColors.text_main }}
                                onPress={() => setVisible(true)}
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


                <Text style={[styles.recent]}>Seus resumos</Text>
                <View
                    style={{
                        marginTop: 10,
                        marginHorizontal: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: colors.grey2,
                        paddingVertical: 10,
                    }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15 }}>
                        <View style={{ backgroundColor: colors.purple_pink_03, padding: 10, borderRadius: 5, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: colors.purple, fontSize: 17, fontWeight: 600 }}>24</Text>
                            <Text style={{ fontSize: 12, color: colors.purple }}>Set</Text>
                        </View>
                        <View>
                            <View >
                                <Text style={{ fontSize: 16, fontWeight: 600, color: colors.text_main }}>Titulo</Text>
                                <Text style={{ fontSize: 14, color: colors.text_secondary, marginTop: 3 }}>Começo do texto...</Text>
                            </View>
                        </View>
                    </View>

                    <Ionicons style={{ color: colors.text_main }} name={'chevron-forward-outline'} size={25} onPress={() => navigation.navigate('FileDetail')} />
                </View>
                <View
                    style={{
                        marginHorizontal: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: colors.grey2,
                        paddingVertical: 10,
                    }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15 }}>
                        <View style={{ backgroundColor: colors.purple_pink_03, padding: 10, borderRadius: 5, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: colors.purple, fontSize: 17, fontWeight: 600 }}>14</Text>
                            <Text style={{ fontSize: 12, color: colors.purple }}>Abril</Text>
                        </View>
                        <View>
                            <View >
                                <Text style={{ fontSize: 16, fontWeight: 600, color: colors.text_main }}>Titulo</Text>
                                <Text style={{ fontSize: 14, color: colors.text_secondary, marginTop: 3 }}>Começo do texto...</Text>
                            </View>
                        </View>
                    </View>

                    <Ionicons style={{ color: colors.text_main }} name={'chevron-forward-outline'} size={25} onPress={() => navigation.navigate('FileDetail')} />
                </View>
                <View
                    style={{
                        marginHorizontal: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingVertical: 10,
                    }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15 }}>
                        <View style={{ backgroundColor: colors.purple_pink_03, padding: 10, borderRadius: 5, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: colors.purple, fontSize: 17, fontWeight: 600 }}>28</Text>
                            <Text style={{ fontSize: 12, color: colors.purple }}>Fev</Text>
                        </View>
                        <View>
                            <View >
                                <Text style={{ fontSize: 16, fontWeight: 600, color: colors.text_main }}>Titulo</Text>
                                <Text style={{ fontSize: 14, color: colors.text_secondary, marginTop: 3 }}>Começo do texto...</Text>
                            </View>
                        </View>
                    </View>

                    <Ionicons style={{ color: colors.text_main }} name={'chevron-forward-outline'} size={25} onPress={() => navigation.navigate('FileDetail')} />
                </View>
                {/*<View style={{ marginTop: 15, marginLeft: 20 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer} onPress={() => navigation.navigate('FileDetail')}>
                            <Image source={require("../assets/images/docs.png")} style={styles.image} resizeMode="cover" onPress={() => navigation.navigate('FileDetail')}></Image>
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
                </View>*/}

                <View style={{ height: 75 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
}


