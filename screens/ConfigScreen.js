import React, {useState} from 'react'
import { StyleSheet, Switch, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, SafeAreaViewBase } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient';




export default function ConfigScreen() {
    const navigation = useNavigation();
        const [isEnabled, setIsEnabled] = useState(false);
      
        const toggleSwitch = () => {
          setIsEnabled((previousState) => !previousState);
        };

  return (
    
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Configurações</Text>
        </View>
      </View>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.card}>
                <View style={{borderBottomColor: themeColors.grey2, borderBottomWidth: 2, paddingBottom: 10}}>
                    <Text style={{fontWeight: 600, fontSize: 20}}>Por que ser Premium?</Text>
                </View>
                <View>
                    <View style={styles.list}>
                        <Ionicons name={'checkmark-sharp'} size={28} color={themeColors.bg_2}  style={{ fontWeight: 'bold' }} />
                        <Text style={styles.textList}>Leituras ilimitadas</Text>
                    </View>
                    <View style={styles.list}>
                        <Ionicons name={'checkmark-sharp'} size={28} color={themeColors.bg_2} />
                        <Text style={styles.textList}>Transforme arquivos ilimitados</Text>
                    </View>
                    <View style={styles.list}>
                        <Ionicons name={'checkmark-sharp'} size={28} color={themeColors.bg_2} />
                        <Text style={styles.textList}>Noticias de última mão</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.card, {display:'flex', flexDirection: 'row', justifyContent: 'space-between'}]} >
                <Text style={{fontWeight: 600, fontSize: 16}}>EasyNews Free</Text>
                <Text style={{color: themeColors.grey}}>Mudar plano</Text>
            </View>

            <View style={{marginHorizontal: 25, marginTop: 30}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Preferências</Text>
                <View style={styles.listOptionSpace}>
                    <View style={styles.listOption}>
                        <Ionicons name={'contrast-sharp'} size={25}/>
                        <Text>Dark Mode</Text>
                    </View>
                    <Switch
                        trackColor={{ false: themeColors.grey, true: themeColors.bg_2 }}
                        thumbColor={isEnabled ? '#121212' : themeColors.bg_2}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                
                <View  style={[styles.listOptionSpace, {marginTop:10}]}>
                    <View style={styles.listOption}>
                        <Ionicons name={'options-sharp'} size={25}/>
                        <Text>Ajustar preferências</Text>
                    </View>
                    <Ionicons name={'chevron-forward-outline'} size={25}/>
                </View>
                
                <View  style={styles.listOptionSpace}>
                    <View style={styles.listOption}>
                        <Ionicons name={'chatbox-ellipses-outline'} size={25}/>
                        <Text>Linguagem</Text>
                    </View>
                    <Ionicons name={'chevron-forward-outline'} size={25}/>
                </View>

                <View style={styles.listOptionSpace}>
                    <View style={styles.listOption}>
                        <Ionicons name={'information-circle-outline'} size={25}/>
                        <Text>Politica e privacidade</Text>
                    </View>
                    
                    <Ionicons name={'chevron-forward-outline'} size={25}/>
                </View>
            </View>

          </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg_light,
    },
    header: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      },
    card:{
        backgroundColor:'#FFF',
        marginHorizontal: 20,
        marginTop:30,
        borderRadius: 15,
        elevation: 15,
        padding: 20
    },
    list:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 15
    },
    textList:{
        color: themeColors.grey,
        fontWeight: 600,
        fontSize: 16
    },
    listOptionSpace:{
        display:'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems:'center',
        marginTop:15,
        justifyContent: 'space-between'
    },
    listOption:{
        display:'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems:'center',
    },
    });
    
    
    

