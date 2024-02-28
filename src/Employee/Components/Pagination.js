import React from 'react'
import { Text, View,Animated, Dimensions } from 'react-native'
import { Color } from '../../GlobalStyles'

const Pagination  =({data,scrollX,index,bottom})=>{

    const { width, height } = Dimensions.get('screen')

    return (
      <View style={{position:'absolute',bottom:bottom,left:30,flexDirection:'row',gap:3}}>
        {data.map((_,idx)=>{
            const inputRange=[(idx-1)*width-40,idx*width-40,(idx+1)*width]
            const dotWidth=scrollX.interpolate({
                inputRange,
                outputRange:[12,30,12],
                extrapolate:'clamp'
            })
            return(<>
            <Animated.View key={idx.toString()} style={[{width:12,height:12,borderRadius:200,backgroundColor:idx===index?Color.colorGray_100:Color.colorwhite_100},{width:dotWidth}]}/>
            </>)
        })}
      </View>
    )
  }


export default Pagination
