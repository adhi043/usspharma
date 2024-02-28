import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeIconO from "react-native-heroicons/outline/HomeIcon";
import PlusIconO from "react-native-heroicons/outline/PlusIcon";
import BellIconO from "react-native-heroicons/outline/BellIcon";
import BellIconS from "react-native-heroicons/solid/BellIcon";
import HomeIconS from "react-native-heroicons/solid/HomeIcon";
import MagnifyingGlassIconO from "react-native-heroicons/outline/MagnifyingGlassIcon";
import MagnifyingGlassIconS from "react-native-heroicons/solid/MagnifyingGlassIcon";
import UserIconO from "react-native-heroicons/outline/UserIcon";
import UserIconS from "react-native-heroicons/solid/UserIcon";
import tw from 'twrnc';

import Home from '../Pages/Home'
import { Text, View } from 'react-native';
import { Color } from '../../GlobalStyles';
import Profile from '../Pages/Profile';
import Notification from '../Pages/Notification';
const BottomNavigator = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator style={{backgroundColor:Color.background}}  screenOptions={{
            tabBarStyle: {
                backgroundColor: Color.background2,
                // position:'absolute',
                elevation: 5,
                borderTopWidth: 0,
                marginHorizontal: 5,
                padding: 0,
                borderRadius: 20,
                height: 70,
                bottom:10

            },
        }}>
            <Tab.Screen name='Home' component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <HomeIconS size={25} color={Color.white} />
                    ) : (
                        <HomeIconO size={25} color={Color.white} />
                    )
                }} />
            <Tab.Screen name='Search' component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <MagnifyingGlassIconS size={25} color={Color.white} />
                    ) : (
                        <MagnifyingGlassIconO size={25} color={Color.white} />
                    )
                }} />
            

            <Tab.Screen name='Notification' component={Notification}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <BellIconS size={25} color={Color.white} />
                    ) : (
                        <BellIconO size={25} color={Color.white} />
                    )
                }} />

            <Tab.Screen name='User' component={Profile}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <UserIconS size={25} color={Color.white} />
                    ) : (
                        <UserIconO size={25} color={Color.white} />
                    )
                }} />



        </Tab.Navigator>
    )
}

export default BottomNavigator
