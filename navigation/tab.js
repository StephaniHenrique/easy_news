import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importe o pacote de ícones que você está usando

import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';
import { themeColors } from "../theme";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) =>(
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: themeColors.bg_2,
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
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
              backgroundColor: '#fff',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height: 60,
              ...styles.shadow
            },
          }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'home-outline'} size={20} color={focused?themeColors.bg_2 : themeColors.grey} />
                    </View>
                )
            }}/>            
            <Tab.Screen name="Find" component={FindScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'search-outline'} size={20} color={focused?themeColors.bg_2 : themeColors.grey} />
                    </View>
                )
            }}/>            
            <Tab.Screen name="Post" component={PostScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'add-outline'} size={25} color={'#fff'} />
                    </View>
                    ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props}/>
                )
            }}/>            
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'person-outline'} size={20} color={focused?themeColors.bg_2 : themeColors.grey} />
                    </View>
                )
            }}/>            
            <Tab.Screen name="Config" component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name={'settings-outline'} size={20} color={focused?themeColors.bg_2 : themeColors.grey} />
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 40,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
      },
  });
  

export default Tabs;