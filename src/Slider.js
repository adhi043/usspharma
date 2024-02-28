
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions } from "react-native";
import { Color, FontSize } from "./GlobalStyles";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Splash from "./Splash";

const Slider = ({navigation}) => {

  const { width, height } = Dimensions.get('screen')




  return (
    <>

      <View style={{ flex: 1, backgroundColor: Color.background }}>

        <View>
          <Image source={require('./assets/slider.jpg')} style={{ width: width, height: height - 190 }} />
        </View>


        <View style={{ width: width, height: height, backgroundColor: Color.colorGray_100, position: 'absolute', top: '0%', marginLeft: '0%',opacity:0.8 }} />

        <Text style={{ color: Color.white, fontSize: 55, fontWeight: '900', position: 'absolute', zIndex: 99999, top: '42%', marginLeft: '7%', lineHeight: 55 }}>USS Pharma is <Text style={{ color: Color.background2, fontSize: 55, fontWeight: '900', position: 'absolute', zIndex: 99999, top: '20%', marginLeft: 10 }}>Solution for</Text> Your <Text style={{ color: Color.background2, fontSize: 55, fontWeight: '900', position: 'absolute', zIndex: 99999, top: '20%', marginLeft: 10 }}>Pharmacy</Text></Text>

        


        <View style={{ paddingHorizontal: 20 }}> 
          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5 }]} onPress={()=>{navigation.navigate('Login')}}>

            <Text style={{ color: Color.white, fontSize: FontSize.pxRegular_size, fontWeight: '600' }}>Get Started</Text>

          </TouchableOpacity>
        </View>
      </View>

    </>
  );
};
export default Slider;
