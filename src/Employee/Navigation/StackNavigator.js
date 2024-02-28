import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import BottomNavigator from './BottomNavigator'
import TopNavigator from './TopNavigator'
import ApplyLeave from '../Pages/ApplyLeave'
import AdminComplaint from '../Pages/AdminComplaint'
import Notification from '../Pages/Notification'
import AttendanceReport from '../Pages/AttendanceReport'
import LeaveReport from '../Pages/LeaveReport'

const StackNavigator =()=>  {

    const Stack=createNativeStackNavigator()
    return (
      <>
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }} initialRouteName={'Main'}>
            <Stack.Screen name='AttendanceReport' component={AttendanceReport} options={{headerShown:false}} />
            <Stack.Screen name='LeaveReport' component={LeaveReport} options={{headerShown:false}} />
            <Stack.Screen name='ApplyLeave' component={ApplyLeave} options={{headerShown:false}} />
            <Stack.Screen name='AdminComplaint' component={AdminComplaint} options={{headerShown:false}} />
            <Stack.Screen name='Notification' component={Notification} options={{headerShown:false}} />
            <Stack.Screen name='Sellers' component={TopNavigator} options={{headerShown:false}} />
            <Stack.Screen name='Main' component={BottomNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
      </>
    )
}

export default StackNavigator
