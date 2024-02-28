import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeIconO from "react-native-heroicons/outline/HomeIcon";
import PlusIconO from "react-native-heroicons/outline/PlusIcon";
import ShoppingCartIconO from "react-native-heroicons/outline/ShoppingCartIcon";
import ShoppingCartIconS from "react-native-heroicons/solid/ShoppingCartIcon";
import HomeIconS from "react-native-heroicons/solid/HomeIcon";
import MagnifyingGlassIconO from "react-native-heroicons/outline/MagnifyingGlassIcon";
import MagnifyingGlassIconS from "react-native-heroicons/solid/MagnifyingGlassIcon";
import UserIconO from "react-native-heroicons/outline/UserIcon";
import UserIconS from "react-native-heroicons/solid/UserIcon";
import tw from 'twrnc';

import Home from '../Pages/Home'
import { Text, View } from 'react-native';
import { Color } from '../../GlobalStyles';
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
            <Tab.Screen name='Add' component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <View style={[tw`p-4 rounded-full`, { backgroundColor: Color.white }]}>
                            <PlusIconO size={25} color={Color.black} />
                        </View>
                    ) : (
                        <View style={[tw`p-4 rounded-full`, { backgroundColor: Color.white }]}>
                            <PlusIconO size={25} color={Color.black} />
                        </View>
                    )
                }} />

            <Tab.Screen name='Cart' component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <ShoppingCartIconS size={25} color={Color.white} />
                    ) : (
                        <ShoppingCartIconO size={25} color={Color.white} />
                    )
                }} />

            <Tab.Screen name='User' component={Home}
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
