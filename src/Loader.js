import LottieView from 'lottie-react-native'
import React from 'react'
import { Dimensions, PixelRatio, Text, View } from 'react-native'
import { Color, FontSize } from './GlobalStyles'

const Loader = ({}) => {


    const { width, height } = Dimensions.get('screen')
 

    return (
        <View style={{ position: 'absolute', flex:1,width:width,height:height,top:0,left:0,justifyContent: 'center', alignItems: 'center',zIndex:9999,backgroundColor:Color.colorwhite_100}}>
            <View style={{}}>
                <LottieView source={require('./assets/kI3bKs8MQ2.json')} autoPlay loop style={{ width: 300, height: 150 }} />
                <Text style={{ color: Color.background2, fontSize:FontSize.pxRegular_size,textAlign:'center' }}>Please wait...</Text>
            </View>
        </View>
    )
}

export default Loader
