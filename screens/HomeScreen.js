import React from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import axios from "axios";
import { themeColors } from '../theme'
import { useTheme } from '../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/MaterialIcons'
import hotels from '../assets/dados'
import { useState, useEffect } from 'react';
import { generateText } from '../GPTAPI/GPTAPI';


const { width } = Dimensions.get('screen');
const imgWidth = width - 40;
const cardWidth = width / 1.7;

export default function HomeScreen() {

  

  const [articles, setArticles] = useState([]);

  async function getNews() {
    const response = await fetch(
      'https://newsdata.io/api/1/news?apikey=pub_314863835828fecb905c17f3c4e3d8e9556b5&language=pt&full_content=1&image=1&category=politics,world,science'
    );
    const data = await response.json();
    const results = data.results;
    setArticles(results); 
  }


 
  useEffect(() => {
    getNews();

  }, []);
  const categories = ['Popular', 'Recomendado'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const { colors } = useTheme();

  const style = {
    header: {
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    categoryListContainer: {
      flexDirection: 'row',
      gap: 10,
      marginHorizontal: 20,
      marginTop: 30,
    },
    categoryListText: {
      fontSize: 17,
      fontWeight: 'bold',
    },
    card: {
      height: 280,
      width: cardWidth,
      elevation: 15,
      marginRight: 20,
      borderRadius: 15,
    },
    cardImage: {
      height: 200,
      width: '100%',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    cardDetails: {
      height: 100,
      borderRadius: 15,
      backgroundColor: colors.bg_secondary,
      position: 'absolute',
      bottom: 0,
      padding: 20,
      width: '100%',
    },
    cardOverLay: {
      height: 280,
      backgroundColor: colors.bg,
      position: 'absolute',
      zIndex: 100,
      width: cardWidth,
      borderRadius: 15,
    },
    topHotelCard: {
      height: 140,
      width: 120,
      backgroundColor: colors.bg_secondary,
      elevation: 15,
      marginHorizontal: 10,
      borderRadius: 10,
    },
    topHotelCardImage: {
      height: 100,
      width: '100%',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
  }

  const CategoryList = () => {
    return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...style.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? colors.purple
                      : themeColors.grey,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: colors.purple,
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const Card = ({ article, index, promptedText }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('Detail', article)}>
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />

          <Image source={{ uri: article.image_url }} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 14, color: colors.text_main }}>
                  {article.title}
                </Text>
                {/* <Text style={{ color: colors.grey, fontSize: 10 }}>
                  {article.description}
                </Text> */}
              </View>
              <Icon name="favorite-border" size={22} color={colors.purple} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={15} color={colors.yellow} />
                <Icon name="star" size={15} color={colors.yellow} />
                <Icon name="star" size={15} color={colors.yellow} />
                <Icon name="star" size={15} color={colors.yellow} />
                <Icon name="star" size={15} color={colors.grey} />
              </View>
              <Text style={{ fontSize: 10, color: colors.grey }}>{article.source_id}</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const TopHotelCard = ({ article }) => {
    return (
      <View style={style.topHotelCard}>
        <Image style={style.topHotelCardImage} source={{ uri: article.image_url }} />
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 6, fontWeight: 'bold', color: colors.text_main }}>{article.title}</Text>
          {/* <Text style={{ fontSize: 7, fontWeight: 'bold', color: colors.grey }}>
            {article.description}
          </Text> */}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={style.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text_main }}>Seu Resumo Diário,</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text_main }}>Feito Sob </Text>
            <Text
              style={{ fontSize: 25, fontWeight: 'bold', color: colors.purple }}>
              Medida
            </Text>
          </View>
        </View>
        <Icon name='favorite' marginTop={5} size={30} color={colors.grey} onPress={() => navigation.navigate('Favorite')} />
      </View>
      <ScrollView showVerticalScrollIndicator={false}>

        <Image source={require('../assets/images/arte.jpg')} style={{ marginLeft: 20, borderRadius: 15, height: 180, width: imgWidth, flex: 1, resizeMode: 'cover' }} />

        <CategoryList />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true },
            )}
            horizontal
            data={articles}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={ ({ item, index }) => <Card article={item} index={index}/>}
            snapToInterval={cardWidth}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{ fontWeight: 'bold', color: colors.grey }}>
            Últimos vistos
          </Text>
          <Text style={{ color: colors.grey }}>Show all</Text>
        </View>
        <FlatList
          data={articles}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item }) => <TopHotelCard article={item} />}
        />
        <View style={{ height: 65 }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

