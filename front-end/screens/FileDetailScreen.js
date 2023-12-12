import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { themeColors } from '../theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import AppInputText from "../components/AppTextInput"
import { LinearGradient } from 'expo-linear-gradient';
import { color } from 'react-native-reanimated';

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
      height: 250,
      overflow: 'hidden',
    },
    header: {
      marginTop: 30,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      justifyContent: 'space-between',
    },
  }

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground style={style.headerImage} source={require("../assets/images/fundo.png")} >
          <View style={style.header}>
            <Icon
              name="arrow-back-ios"
              size={24}
              color={'#fff'}
              onPress={navigation.goBack}
            />
          </View>
        </ImageBackground>
        <View style={{ backgroundColor:colors.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -50, paddingTop: 20, height: "100%" }}>
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text_main }}>Titulo</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: colors.grey,
                marginTop: 5,
              }}>

              20/09/2023
            </Text>

            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ lineHeight: 20, color: colors.text_secondary }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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
      <View style={{ position: 'absolute', bottom: 0, width: '100%', paddingBottom: 30, paddingTop: 10 }}>
        <View
          style={{
            paddingHorizontal: 10 * 2,
            flexDirection: "row",
            gap: 16
          }}
        >
          <TouchableOpacity style={{ width: "48%" }} >
            <LinearGradient style={{
              paddingVertical: 10,
              paddingHorizontal: 13 * 2,
              borderRadius: 10,
            }}
              colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}>
              <Text
                className="text-xl text-center" style={{ color: '#F5F5F5' }}
              >
                Refazer
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "48%" }} >
            <LinearGradient style={{ borderRadius: 10 }}
              colors={['#DC0030', '#DC0030']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}>
              <View
                style={{
                  backgroundColor: colors.bg,
                  margin: 2,
                  borderRadius: 8,
                  paddingVertical: 7,
                  paddingHorizontal: 10 * 2
                }}>
                <Text
                  className="text-xl text-center" style={{ color: '#DC0030' }}
                >
                  Deletar
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FileDetailScreen;