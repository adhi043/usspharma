import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import BottomNavigator from './BottomNavigator'
import TopNavigator from './TopNavigator'
import Attendance from '../Pages/Attendance'

const StackNavigator =()=>  {

    const Stack=createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }} initialRouteName={'Main'}>
            <Stack.Screen name='Attendance' component={Attendance} options={{headerShown:false}} />
            <Stack.Screen name='Sellers' component={TopNavigator} options={{headerShown:false}} />
            <Stack.Screen name='Main' component={BottomNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default StackNavigator
