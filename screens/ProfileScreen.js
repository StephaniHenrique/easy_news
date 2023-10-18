import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient';




export default function ProfileScreen() {
    const navigation = useNavigation();

  return (
      <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.cardProfile}>
                <View style={styles.profileImage}>
                    <Image source={require("../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <LinearGradient style={styles.premium}
                        colors={['rgba(91, 47, 189, 0.3)', 'rgba(180, 110, 220, 0.5)']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}>
                        <Image source={require("../assets/icons/premium.png")} style={styles.imagePremium}/>
                    </LinearGradient>
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "500", fontSize: 20 }]}>Julie</Text>
                    <Text style={[styles.text, { color: themeColors.grey, fontSize: 16 }]}>julie.blabla@usp.br</Text>
                </View>
                <TouchableOpacity style={{marginVertical: 20}}>
                    <LinearGradient style={{borderRadius: 8, paddingVertical: 6}}
                    colors={[ '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}>
                        <Text 
                            className="text-xl text-center" style={{color:themeColors.bg_light}}
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
              <View style={{ marginTop: 15, marginLeft: 20}}>
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
                          <Text style={[styles.text, { color: "#525660", fontWeight: "500" }]}>
                              Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                          </Text>
                      </View>
                  </View>

                  <View style={styles.recentItem}>
                      <View style={styles.activityIndicator}></View>
                      <View style={{ width: 250 }}>
                          <Text style={[styles.text, { color: "#525660", fontWeight: "500" }]}>
                              Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                          </Text>
                      </View>
                  </View>
              </View>
              
              <View style={{height: 75}}></View>
          </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg_light,
    },
    cardProfile:{
        backgroundColor:'#FFF',
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
        borderColor: 'rgba(91, 47, 189, 0.2)',
        borderWidth: 3,
        marginTop: -45,
        backgroundColor:'#fff'
    },
    premium:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100, 
        marginTop: -40
    },
    imagePremium:{
        width: 20,
        height: 20,
    },
    premiumText:{
        color:themeColors.bg_2
    },
    infoContainer: {
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
        backgroundColor: '#EBEBEB',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 15
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
  text: {
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10,
      borderColor: themeColors.grey2,
      borderWidth: 2
  },
  recent: {
      marginLeft: 25,
      marginTop: 28,
      fontSize: 14,
      color: themeColors.grey,
      fontWeight: 'bold'
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: themeColors.bg_2,
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  }
});

