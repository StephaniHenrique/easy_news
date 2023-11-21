import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView
} from 'react-native';
import { themeColors } from '../theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import AppInputText from "../components/AppTextInput"

const FileDetailScreen = ({ navigation }) => {

  const { colors } = useTheme();


  const style = {
    priceTag: {
      height: 40,
      alignItems: 'center',
      marginLeft: 40,
      paddingLeft: 20,
      flex: 1,
      backgroundColor: colors.purple,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      flexDirection: 'row',
    },
    iconContainer: {
      position: 'absolute',
      height: 50,
      width: 50,
      backgroundColor: colors.purple,
      top: -25,
      right: 25,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerImage: {
      height: 220,
      backgroundColor: colors.purple,
      overflow: 'hidden',
    },
    header: {
      marginTop: 60,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      justifyContent: 'space-between',
    },
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          barStyle="light-content"
          translucent
        />
        <View style={style.headerImage} >
          <View style={style.header}>
            <Icon
              name="arrow-back-ios"
              size={24}
              color={'#fff'}
              onPress={navigation.goBack}
            />
          </View>
        </View>
        <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: colors.bg, marginTop: -100, paddingTop: 20 }}>
         
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text_main }}>Titulo</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: colors.grey,
                marginTop: 5,
              }}>
              24/09/2023
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
            
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ lineHeight: 20, color: colors.text_secondary, textAlign:'justify' }}>
                O texto todo da pessoa resumido aqui IKBLWEB  LF WILEB I FILB FIUBFEKSDJB CIKDJB OLWEU IFWLSBNSDJ CNSLDFIVBESRIK  JFNELRIFBRLFUEDUIL LDKNCVKLDSJB CFDJB FILERU FBDJKCBKDJSB CU
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', width: 100 }} >

            </Text>
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FileDetailScreen;