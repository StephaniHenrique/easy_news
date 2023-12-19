import React, {useState, useEffect} from 'react'
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../theme/ThemeProvider';

import hotels from '../assets/dados'


const {width} = Dimensions.get('screen');
const cardWidth = width - 40;

const FavoriteScreen = ({navigation}) => {
    const baseURL = 'https://api.github.com';
    const perPage = 20;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadApi();
    }, []);

    async function loadApi() {
        if (loading) return;

        setLoading(true);

        const response = await axios.get(`${baseURL}/search/repositories?q=react&per_page=${perPage}&page=${page}`);

        setData([...data, ...response.data.items]);
        setPage(page + 1);
        setLoading(false);
    }

    const {colors} = useTheme();

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
        cardOption: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            flex: 1,
            backgroundColor: colors.grey
        },
        card: {
            marginBottom: 20,
            height: 104,
            width: cardWidth,
            marginRight: 20,
            borderRadius: 15,
            backgroundColor: colors.bg_secondary,
            borderWidth: 2, // largura da borda em pixels
            borderColor: colors.grey2,
            display: 'flex',
            flexDirection: 'row'
        },
        cardImage: {
            height: 100,
            width: 100,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            resizeMode: 'cover'
        },
        cardDetails: {
            height: 100,
            borderRadius: 15,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignContent: 'center',
            marginHorizontal: 10
        },
    }

    const ListItem = ({hotel, index}) => {
        return (
            <TouchableOpacity>
                <View style={{...styles.card}}>

                    <Image source={require('../assets/images/noticias.jpg')} style={styles.cardImage}/>
                    <View style={styles.cardDetails}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 195
                            }}>
                            <View>
                                <Text style={{fontWeight: 'bold', fontSize: 17, color: colors.text_main}}>
                                    {hotel.name}
                                </Text>
                                <Text style={{color: colors.grey, fontSize: 12}}>
                                    {hotel.location}
                                </Text>
                            </View>
                            <View>
                                <Icon name="favorite" size={22} color={colors.purple}/>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name="star" size={15} color={colors.yellow}/>
                                <Icon name="star" size={15} color={colors.yellow}/>
                                <Icon name="star" size={15} color={colors.yellow}/>
                                <Icon name="star" size={15} color={colors.yellow}/>
                                <Icon name="star" size={15} color={colors.grey}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20}}>
                    <Icon
                        name="arrow-back-ios"
                        size={20}
                        color={colors.text_main}
                        onPress={navigation.goBack}
                    />
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: colors.text_main}}>Favoritos</Text>
                </View>
            </View>

            <FlatList
                contentContainerStyle={{marginHorizontal: 20}}
                data={hotels}
                keyExtractor={item => String(item.id)}
                renderItem={({item, index}) => <ListItem hotel={item} index={index}/>}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default FavoriteScreen;
