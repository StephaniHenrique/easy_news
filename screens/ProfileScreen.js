import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'



export default function ProfileScreen() {
    const navigation = useNavigation();

  return (
      <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
          
              <View style={{ alignSelf: "center", marginTop:50 }}>
                  <View style={styles.profileImage}>
                      <Image source={require("../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                  </View>
                  <View style={styles.add}>
                      <Ionicons name="create-outline" size={20} color="#fff" ></Ionicons>
                  </View>
              </View>

              <View style={styles.infoContainer}>
                  <Text style={[styles.text, { fontWeight: "500", fontSize: 25 }]}>Julie</Text>
                  <Text style={[styles.text, { color: themeColors.grey, fontSize: 16 }]}>julie.blabla@usp.br</Text>
              </View>

              <View style={styles.statsContainer}>
                  <View style={styles.statsBox}>
                      <Text style={[styles.text, { fontSize: 20 }]}>35</Text>
                      <Text style={[styles.text, styles.subText]}>Lidos</Text>
                  </View>
                  <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                      <Text style={[styles.text, { fontSize: 20 }]}>12</Text>
                      <Text style={[styles.text, styles.subText]}>Salvos</Text>
                  </View>
                  <View style={styles.statsBox}>
                      <Text style={[styles.text, { fontSize: 20 }]}>10</Text>
                      <Text style={[styles.text, styles.subText]}>Adicionados</Text>
                  </View>
              </View>

              <View style={{ marginTop: 32 }}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                      <View style={styles.mediaImageContainer}>
                          <Image source={require("../assets/images/noticias.jpg")} style={styles.image} resizeMode="cover"></Image>
                      </View>
                      <View style={styles.mediaImageContainer}>
                          <Image source={require("../assets/images/noticias.jpg")} style={styles.image} resizeMode="cover"></Image>
                      </View>
                      <View style={styles.mediaImageContainer}>
                          <Image source={require("../assets/images/noticias.jpg")} style={styles.image} resizeMode="cover"></Image>
                      </View>
                  </ScrollView>
              </View>
              <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
              <View style={{ alignItems: "center" }}>
                  <View style={styles.recentItem}>
                      <View style={styles.activityIndicator}></View>
                      <View style={{ width: 250 }}>
                          <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                              Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                          </Text>
                      </View>
                  </View>

                  <View style={styles.recentItem}>
                      <View style={styles.activityIndicator}></View>
                      <View style={{ width: 250 }}>
                          <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
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
      backgroundColor: "#FFF"
  },
  text: {
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 160,
      height: 160,
      borderRadius: 100,
      overflow: "hidden",
      borderColor: 'rgba(91, 47, 189, 0.2)',
      borderWidth: 3,

  },
  add: {
      backgroundColor: themeColors.bg_2,
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 45,
      height: 45,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  recent: {
      marginLeft: 40,
      marginTop: 32,
      marginBottom: 16,
      fontSize: 12
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

