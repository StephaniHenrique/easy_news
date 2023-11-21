import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote correspondente
import { useTheme } from '../theme/ThemeProvider';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { themeColors } from '../theme'

const { width } = Dimensions.get('screen');
const cardWidth = width - 40;
const cardHeight = cardWidth * 0.55;
const inputWidth = (width - 50) / 2;

const CartaoScreen = ({ navigation }) => {
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
      width: cardWidth,
      height: cardHeight,
      margin: 20,
      borderRadius: 18,
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
    cardFront: {
      height: '100%',
      width: '100%',
      color: 'white',
    },
    topcard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    cardnumber: {
      textShadowColor: 'rgba(0, 0, 0, 0.22)',
      fontFamily: 'Roboto',
      fontSize: 18,
      color: '#ffffff',
    },
    visa: {
      display: 'flex',
      flexDirection: 'row',
      gap: -10,
    },
    circle: {
      backgroundColor: 'rgba(252, 177, 3, 0.7)',
      height: 25,
      width: 25,
      borderRadius: 150,
    },
    circle1: {
      backgroundColor: 'rgba(252, 3, 3, 1)',
      height: 25,
      width: 25,
      borderRadius: 150,
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      width: 200
    },
    bottomcard: {
      marginTop: 20,
    },
    nomecard: {
      textShadowColor: 'rgba(0, 0, 0, 0.22)',
      fontFamily: 'Roboto',
      fontSize: 16,
      color: '#ffffff',
    },
    validade: {
      textShadowColor: 'rgba(0, 0, 0, 0.22)',
      fontFamily: 'Roboto',
      fontSize: 15,
      color: '#ffffff',
    },
    cvv: {
      textShadowColor: 'rgba(0, 0, 0, 0.22)',
      fontFamily: 'Roboto',
      fontSize: 15,
      color: '#ffffff',
    },
    form: {
      marginHorizontal: 20,
    },
    inputlabel: {
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: '600',
      color: '#4b4b62',
      marginTop: 16,
      marginLeft: 4,
      width: '100%'
    },
    input: {
      width: '100%',
      height: 40,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#dcdcdc',
      backgroundColor: '#fbfbfb',
      marginTop: 8,
      padding: 10,
    },

  }

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardVal, setCardVal] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [focusedName, setFocusedName] = useState(false);
  const [focusedNumber, setFocusedNumber] = useState(false);
  const [focusedVal, setFocusedVal] = useState(false);
  const [focusedCvv, setFocusedCvv] = useState(false);

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
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text_main }}>Inserir cartão</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <LinearGradient style={styles.card}
            colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}>
            <View style={styles.topcard}>
              <Text style={styles.cardnumber}>{cardNumber || '0000 0000 0000 0000'}</Text>
              <View style={styles.visa}><View style={styles.circle1}></View><View style={styles.circle}></View></View>
            </View>

            <View style={styles.flex}>
              <Text style={styles.validade}>{cardVal || 'MM/AA'}</Text>
              <Text style={styles.cvv}>{cardCvv || 'CVV'}</Text>
            </View>

            <View style={styles.bottomcard}>
              <Text style={styles.nomecard}>{cardName || 'Nome no Cartão'}</Text>
            </View>
          </LinearGradient>

          <View style={styles.form}>
            <TextInput
              onFocus={() => setFocusedName(true)}
              onBlur={() => setFocusedName(false)}
              placeholderTextColor={colors.grey}
              style={[
                {
                  padding: 15,
                  backgroundColor: colors.bg_secondary,
                  borderRadius: 10,
                  marginVertical: 10,
                  elevation: 2,
                  color:colors.text_main
                },
                focusedName && {
                  borderWidth: 1.2,
                  borderColor: colors.purple_pink,
                },
              ]}
              placeholder='Nome exibido no cartão'
              value={cardName}
              onChangeText={(text) => setCardName(text)}
            />
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
              <TextInput
                onFocus={() => setFocusedVal(true)}
                onBlur={() => setFocusedVal(false)}
                placeholderTextColor={colors.grey}
                style={[
                  {
                    padding: 15,
                    backgroundColor: colors.bg_secondary,
                    borderRadius: 10,
                    marginVertical: 10,
                    elevation: 2,
                    color:colors.text_main,
                    width: inputWidth
                  },
                  focusedVal && {
                    borderWidth: 1.2,
                    borderColor: colors.purple_pink,
                  },
                ]}
                placeholder='Válidade'
                value={cardVal}
                onChangeText={(text) => setCardVal(text)}
              />
              <TextInput
                onFocus={() => setFocusedCvv(true)}
                onBlur={() => setFocusedCvv(false)}
                placeholderTextColor={colors.grey}
                style={[
                  {
                    padding: 15,
                    backgroundColor: colors.bg_secondary,
                    borderRadius: 10,
                    marginVertical: 10,
                    elevation: 2,
                    color:colors.text_main,
                    width: inputWidth
                  },
                  focusedCvv && {
                    borderWidth: 1.2,
                    borderColor: colors.purple_pink,
                  },
                ]}
                placeholder='CVV'
                value={cardCvv}
                onChangeText={(text) => setCardCvv(text)}
              />
            </View>
            <TextInput
              onFocus={() => setFocusedNumber(true)}
              onBlur={() => setFocusedNumber(false)}
              placeholderTextColor={colors.grey}
              style={[
                {
                  padding: 15,
                  backgroundColor: colors.bg_secondary,
                  borderRadius: 10,
                  marginVertical: 10,
                  elevation: 2,
                  color:colors.text_main
                },
                focusedNumber && {
                  borderWidth: 1.2,
                  borderColor: colors.purple_pink,
                },
              ]}
              placeholder='Número do cartão'
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
            />

            <TouchableOpacity style={{ margin: 20 }}>
              <LinearGradient className="py-3 rounded-xl"
                colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}>
                <Text
                  className="text-xl font-bold text-center" style={{ color: themeColors.bg }}
                  onPress={() => navigation.navigate('Cartao')}
                >
                  Comprar
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default CartaoScreen;
