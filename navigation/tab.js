import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';
import ConfigScreen from '../screens/ConfigScreen';
import { useTheme } from "../theme/ThemeProvider";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress, buttonColor}) =>(
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
    const {colors} = useTheme();

    return(
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
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'home-outline'} size={20} color={focused?colors.purple : colors.grey} />
                    </View>
                )
            }}/>            
            <Tab.Screen name="Find" component={FindScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'search-outline'} size={20} color={focused?colors.purple : colors.grey} />
                    </View>
                )
            }}/>            
            <Tab.Screen name="Post" component={PostScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'add-outline'} size={25} color={colors.text_contrast} />
                    </View>
                    ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} buttonColor={colors.purple}/>
                )
            }}/>            
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'person-outline'} size={20} color={focused?colors.purple : colors.grey} />
                    </View>
                )
            }}/>            
            <Tab.Screen name="Config" component={ConfigScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'settings-outline'} size={20} color={focused?colors.purple : colors.grey} />
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}


export default Tabs;