import React, {useContext, useEffect, useState} from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    Text,
    View,
    Image,
    TextInput,
    SafeAreaView,
    Linking
} from 'react-native';
import {themeColors} from '../theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '../theme/ThemeProvider';

import AppInputText from "../components/AppTextInput"
import {generateText} from '../GPTAPI/GPTAPI';
import {UserContext} from "../contexts/UserContext";


const DetailScreen = ({navigation, route}) => {
    const item = route.params;
    const {colors} = useTheme();
    const [translatedText, setTranslatedText] = useState('A IA está traduzindo o conteúdo para você..')
    const generateResponse = async (baseText, prompt) => {
        const texto = prompt;
        try {
            const resposta = await generateText(`${texto} ${baseText}`);
            return resposta;
        } catch (error) {
            console.error("Ocorreu um erro ao gerar a resposta:", error);
            throw error;
        }
        ;
    }
    const clickLink = () => {
        Linking.openURL(item.link);
    };


    useEffect(() => {
        const fetchData = async () => {
            const prompt = `
        Reescreva a notícia para torná-la mais acessível a uma pessoa com as seguintes características de leitura:

        1. Idade: 20 anos
        2. Estado: Pernambuco
        3. Usa gírias: sim
        4. Usa expressões regionais: sim
        5. Tem dislexia: não
        6. Grau Acadêmico: ensino fundamental

        Certifique-se de manter os fatos da notícia inalterados e adapte o tom para refletir o contexto dessa pessoa.
        `;
            try {
                const response = await generateResponse(item.content, prompt)
                setTranslatedText(response);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

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
            height: 400,
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

    const Comentarios = () => {
        return (
            <View style={{borderColor: colors.grey2, borderTopWidth: 2, marginHorizontal: 20, paddingVertical: 10}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <View style={{width: 35, height: 35, borderRadius: 100, overflow: 'hidden'}}>
                            <Image source={require("../assets/profile-pic.jpg")} resizeMode="cover" width={undefined}
                                   height={undefined} style={{flex: 1}}></Image>
                        </View>
                        <View>
                            <Text style={{
                                color: colors.text_secondary,
                                fontWeight: 600,
                                fontSize: 16,
                                marginBottom: 4
                            }}>Name</Text>
                            <Text style={{color: themeColors.grey, fontSize: 12}}>18/10/2023</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Icon name="star" size={16} color={colors.yellow}/>
                        <Icon name="star" size={16} color={colors.yellow}/>
                        <Icon name="star" size={16} color={colors.yellow}/>
                        <Icon name="star" size={16} color={colors.yellow}/>
                        <Icon name="star" size={16} color={colors.grey}/>
                    </View>
                </View>
                <Text style={{marginLeft: 45, textAlign: 'justify', marginTop: 10, color: colors.grey}}>
                    Esse resumo está muito bom. Me ajudou muito.
                </Text>
            </View>
        )
    }

    const handleFavorite = () => {
        const [newsId, setNewsId] = useState('')
        const {token, email} = useContext(UserContext);
        fetch('http://192.168.0.29:8080/news/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newsId, email})
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.status)
                    throw new Error('Erro no favoritamento da notícia!');
                }
            })
            .then(data => {
                console.log('Notícia favoritada com sucesso!');
                navigation.navigate('Tab');
            })
            .catch(error => {
                console.error(error);
            });
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
                <ImageBackground style={style.headerImage} source={{uri: item.image_url}}>
                    <View style={style.header}>
                        <Icon
                            name="arrow-back-ios"
                            size={24}
                            color={'#fff'}
                            onPress={navigation.goBack}
                        />
                    </View>
                </ImageBackground>
                <View style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: colors.bg,
                    marginTop: -100,
                    paddingTop: 20
                }}>
                    <View style={style.iconContainer}>
                        <Icon name="favorite-border" color={'#fff'} size={24} onPress={handleFavorite}/>
                    </View>
                    <View style={{marginTop: 20, paddingHorizontal: 20}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text_main}}>{item.title}</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: colors.grey,
                                marginTop: 5,
                            }}>

                            {String(translatedText)}
                        </Text>

                        <Text style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: colors.secondary,
                            marginTop: 5,
                        }} onPress={clickLink}>
                            Notícia original:{item.link}
                        </Text>
                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        marginRight: 5,
                                        color: colors.text_secondary
                                    }}>
                                        4.0
                                    </Text>
                                    <Icon name="star" size={20} color={colors.yellow}/>
                                    <Icon name="star" size={20} color={colors.yellow}/>
                                    <Icon name="star" size={20} color={colors.yellow}/>
                                    <Icon name="star" size={20} color={colors.yellow}/>
                                    <Icon name="star" size={20} color={colors.grey}/>
                                </View>

                            </View>
                        </View>
                        <View style={{marginTop: 20}}>
                            <Text style={{lineHeight: 20, color: colors.text_secondary}}>
                                {item.details}
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
                        <Text style={{fontSize: 20, fontWeight: 'bold', width: 100}}>

                        </Text>
                        <View style={style.priceTag}>
                            <Text
                                style={{
                                    width: 200,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: themeColors.text_main,
                                    marginLeft: 5,
                                }}>
                                {item.source_id}
                            </Text>

                        </View>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        marginHorizontal: 20,
                        marginVertical: 20,
                    }}>
                        <Text style={{fontWeight: 'bold', color: colors.grey}}>Comentários</Text>
                        <Text style={{color: colors.grey}}>Ver todos</Text>
                    </View>
                    <Comentarios/>
                    <View style={{height: 80}}></View>
                </View>
            </ScrollView>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
                alignItems: 'center',
                backgroundColor: colors.bg_secondary,
                position: 'absolute',
                bottom: 0,
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 20,
                elevation: 15
            }}>
                <View style={{width: 35, height: 35, backgroundColor: '#000', borderRadius: 100, overflow: 'hidden'}}>
                    <Image source={require("../assets/profile-pic.jpg")} resizeMode="center"></Image>
                </View>
                <AppInputText placeholder="Comente"
                              customStyles={{width: '75%', height: 50, backgroundColor: colors.bg_ter}}/>

                <Ionicons name={'send-outline'} size={20} color={colors.grey}/>
            </View>
        </SafeAreaView>
    );
};

export default DetailScreen;