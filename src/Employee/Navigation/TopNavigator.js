import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import HomeIconO from "react-native-heroicons/outline/HomeIcon";
import PlusIconO from "react-native-heroicons/outline/PlusIcon";
import ShoppingCartIconO from "react-native-heroicons/outline/ShoppingCartIcon";
import HomeIconS from "react-native-heroicons/solid/HomeIcon";
import MagnifyingGlassIconO from "react-native-heroicons/outline/MagnifyingGlassIcon";
import MagnifyingGlassIconS from "react-native-heroicons/solid/MagnifyingGlassIcon";
import UserIconO from "react-native-heroicons/outline/UserIcon";
import UserIconS from "react-native-heroicons/solid/UserIcon";
import Home from '../Pages/Home'
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, TextInput, Dimensions, ScrollView } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import tw from "twrnc";
import ArrowLongLeftIcon from "react-native-heroicons/outline/ArrowLongLeftIcon";
import BriefcaseIconO from "react-native-heroicons/outline/BriefcaseIcon";
import BriefcaseIconS from "react-native-heroicons/solid/BriefcaseIcon";
import HeartIcon from "react-native-heroicons/solid/HeartIcon";
import XMarkIcon from "react-native-heroicons/solid/XMarkIcon";
import MapPinIcon from "react-native-heroicons/solid/MapPinIcon";
import PlusCircleIcon from "react-native-heroicons/solid/PlusCircleIcon";
import Modal from "react-native-modal";
import ShoppingCartIconS from "react-native-heroicons/solid/ShoppingCartIcon";
import Attendance from '../Pages/AttendanceReport';



const TopNavigator = ({ navigation }) => {

    const Tab = createMaterialTopTabNavigator()

    return (
        <>

            <View style={{ backgroundColor: Color.background }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: 20, paddingBottom: 0 }}>

                    <View style={{ width: 270, height: 270, borderRadius: 200, backgroundColor: Color.background2, position: 'absolute', left: -50, top: -50, zIndex: -1 }} />

                    <View style={[tw`flex-row justify-between items-center mb-1`, { paddingBottom: 10 }]}>
                        <View style={tw`flex-row justify-between items-center gap-x-3`}>
                            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                navigation.goBack()
                            }}>
                                <ArrowLongLeftIcon size={25} color={Color.white} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Employe Profile</Text>
                            </View>

                        </View>

                        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.colorGray_100, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }]}>
                            <MagnifyingGlassIconS size={25} color={Color.white} />
                        </TouchableOpacity>
                    </View>







                    <View style={{ marginBottom: 0, width: '100%' }}>


                        <View style={[tw`flex-row justify-between items-center mb-2`, { width: '100%', height: 'auto', borderRadius: 20, }]}>
                            <View style={[tw`flex-row items-center gap-x-3`, { width: '100%' }]}>
                                <View style={{ padding: 2, borderRadius: 20, borderWidth: 1, borderColor: Color.primary }}>
                                    <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 80, height: 80 }} />
                                </View>
                                <View>
                                    <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '600' }}>Muhammad Adnan</Text>
                                    <Text style={{ color: Color.colorGray_100, fontSize: FontSize.font_size }}>@Manager</Text>

                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorMediumseagreen, borderRadius: 20, flexDirection: 'row', width: '70%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }]}>

                                        <Text style={{ color: Color.white, fontSize: FontSize.font_size }}>Present</Text>


                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>



                        <Text style={{ color: Color.gray2, marginVertical: 10, marginBottom: 30, }}>Your product has been successfully added for promotion, Your product has been successfully added for promotion!</Text>





                    </View>









                </View>
            </View>




            <Tab.Navigator style={{ backgroundColor: Color.background }} screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'rgba(255,255,255,1)',
                    // position:'absolute',
                    elevation: 5,
                    borderTopWidth: 0,
                    marginHorizontal: 15,
                    padding: 0,
                    borderRadius: 0,
                    height: 60,
                    marginBottom: 10,

                },
            }}>
                <Tab.Screen name='Attendance' component={Attendance}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarLabelStyle: { color: 'white' },
                        tabBarIcon: ({ focused }) => focused ? (
                            <BriefcaseIconS size={25} color={Color.background2} />
                        ) : (
                            <BriefcaseIconO size={25} color={Color.black} />
                        )
                    }} />
                <Tab.Screen name='Slider' component={Attendance}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarLabelStyle: { color: 'white' },
                        tabBarIcon: ({ focused }) => focused ? (
                            <MagnifyingGlassIconS size={25} color={Color.background2} />
                        ) : (
                            <MagnifyingGlassIconO size={25} color={Color.black} />
                        )
                    }} />

                <Tab.Screen name='Cart' component={Home}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarLabelStyle: { color: 'white' },
                        tabBarIcon: ({ focused }) => focused ? (
                            <ShoppingCartIconS size={25} color={Color.background2} />
                        ) : (
                            <ShoppingCartIconO size={25} color={Color.black} />
                        )
                    }} />

                <Tab.Screen name='User' component={Home}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarLabelStyle: { color: 'white' },
                        tabBarIcon: ({ focused }) => focused ? (
                            <UserIconS size={25} color={Color.background2} />
                        ) : (
                            <UserIconO size={25} color={Color.black} />
                        )
                    }} />



            </Tab.Navigator>



        </>
    )
}

export default TopNavigator
