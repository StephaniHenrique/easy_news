import React, {useState, useEffect} from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'

import { themeColors } from '../theme'
import Icon from 'react-native-vector-icons/MaterialIcons'

import hotels from '../assets/dados'


export default function FindScreen() {
  const baseURL = 'https://api.github.com';
  const perPage = 20;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    loadApi();
  },[]);

  async function loadApi(){
    if(loading) return;

    setLoading(true);

    const response = await axios.get(`${baseURL}/search/repositories?q=react&per_page=${perPage}&page=${page}`);

    setData([...data, ...response.data.items]);
    setPage(page+1);
    setLoading(false);
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={StyleSheet.container}>
      <View style={styles.searchInputContainer} >
          <Icon name="search" size={25} style={{marginLeft:15}}/>
          <TextInput placeholder="Search" style={{fontSize:20, paddingLeft: 10}}/>
        </View>
        <FlatList
        style={{ marginTop: 35, marginBottom: 80}}
        contentContainerStyle={{marginHorizontal:20}}
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <ListItem data={item}/>}
        onEndReached={loadApi}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<FooterList load={loading}/>}
        />
      </View>
    </SafeAreaView>
  )
}


function ListItem({data}){
  return(
    <TouchableOpacity>
    <View style={{...styles.card}}>
      <View style={{...styles.cardOverLay}} />

      <Image source={require('../assets/images/arte.jpg')} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <View
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              {data.full_name}
            </Text>
            <Text style={{color: themeColors.grey, fontSize: 12}}>
              {data.full_name}
            </Text>
          </View>
          <Icon name="favorite-border" size={22} color={themeColors.primary} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="star" size={15} color={themeColors.yellow} />
            <Icon name="star" size={15} color={themeColors.yellow} />
            <Icon name="star" size={15} color={themeColors.yellow} />
            <Icon name="star" size={15} color={themeColors.yellow} />
            <Icon name="star" size={15} color={themeColors.grey} />
          </View>
          <Text style={{fontSize: 10, color: themeColors.grey}}>365 coments</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}

function FooterList({load}){
  if(!load) return null;

  return(
    <View style={styles.loading}>
      <ActivityIndicator size={20} color={'#121212'}/>
    </View>
  )
}

const {width} = Dimensions.get('screen');
const cardWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: themeColors.grey2,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    marginBottom:40,
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: themeColors.bg_light,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'contain'
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: themeColors.bg_light,
    bottom: 0,
    padding: 20,
    width: '100%',
  },

  listItem:{
    backgroundColor:'#121212',
    padding:25, 
    marginTop: 20,
    borderRadius: 10,
  },
  listText:{
    fontSize: 16,
    color:'#fff',
  },
  loading:{
    padding:10,
  }
});

