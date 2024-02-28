import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import Business from './Business/Navigation/StackNavigator'
import Employee from './Employee/Navigation/StackNavigator'
import Slider from './Slider'
import Login from './Login'
import Splash from './Splash'

const StackNavigator =()=>  {

    const Stack=createNativeStackNavigator()
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }} initialRouteName={'Splash'}>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}} />
            <Stack.Screen name='Slider' component={Slider} options={{headerShown:false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
            <Stack.Screen name='Employee' component={Employee} options={{headerShown:false}} />
            <Stack.Screen name='Business' component={Business} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default StackNavigator
