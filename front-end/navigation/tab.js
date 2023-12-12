import React from "react";

import { Text, View, TouchableOpacity, Animated, Modal } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';
import ConfigScreen from '../screens/ConfigScreen';
import { useTheme } from "../theme/ThemeProvider";

import { LinearGradient } from 'expo-linear-gradient';
import AppTextInput from "../components/AppTextInput";


const Tab = createBottomTabNavigator();



const CustomTabBarButton = ({ children, onPress, buttonColor }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center'
        }}
        onPress={onPress}
    >
        <View style={{
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: buttonColor,
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    const { colors } = useTheme();

    const [visible, setVisible] = React.useState(false);

    const [focusedAreaText, setFocusedAreaText] = React.useState(false);

    const styles = {

        modalBackGround: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            width: '80%',
            backgroundColor: colors.bg_secondary,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 15,
            elevation: 20,
        },
    }

    const ModalPoup = ({ visible, children }) => {
        const [showModal, setShowModal] = React.useState(visible);
        const scaleValue = React.useRef(new Animated.Value(0)).current;
        React.useEffect(() => {
            toggleModal();
        }, [visible]);
        const toggleModal = () => {
            if (visible) {
                setShowModal(true);
                Animated.spring(scaleValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            } else {
                setTimeout(() => setShowModal(false), 200);
                Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        };
        return (
            <Modal transparent visible={showModal}>
                <View style={styles.modalBackGround}>
                    <Animated.View
                        style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        backgroundColor: colors.bg_secondary,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        height: 60,
                    },
                }}>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name={'home-outline'} size={20} color={focused ? colors.purple : colors.grey} />
                        </View>
                    )
                }} />
                <Tab.Screen name="Find" component={FindScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name={'search-outline'} size={20} color={focused ? colors.purple : colors.grey} />
                        </View>
                    )
                }} />
                <Tab.Screen name="Post" component={PostScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name={'add-outline'} size={25} color={colors.grey2} />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} buttonColor={colors.purple} onPress={() => setVisible(true)} />
                    )
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name={'person-outline'} size={20} color={focused ? colors.purple : colors.grey} />
                        </View>
                    )
                }} />
                <Tab.Screen name="Config" component={ConfigScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name={'settings-outline'} size={20} color={focused ? colors.purple : colors.grey} />
                        </View>
                    )
                }} />
            </Tab.Navigator>

            <ModalPoup visible={visible}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: '100%', borderBottomWidth: 1, paddingBottom: 10, borderColor: colors.grey2 }}>
                    <Text style={{ fontSize: 18, fontWeight: 500, color: colors.text_secondary }}>Adicione sua noticia!</Text>
                    <Ionicons name={'close'} size={22} color={colors.purple} onPress={() => setVisible(false)} />
                </View>

                <View style={{ marginTop: 20 }}>
                    <AppTextInput placeholder="Titulo" customStyles={{ backgroundColor: colors.bg }} />
                    <AppTextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Seu texto"
                        customStyles={{ backgroundColor: colors.bg, textAlignVertical:"top", maxHeight:150}} />
                    <LinearGradient style={{ borderRadius: 8, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
                        colors={['#f872ff', '#d76aff', '#b561fa', '#9457e7', '#744fd4']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}>
                        <Text
                            style={{ fontWeight: 600, fontSize: 18, color: '#F5F5F5' }}
                        >
                            Enviar
                        </Text>
                    </LinearGradient>
                </View>
            </ModalPoup>
        </View>
    )
}


export default Tabs;