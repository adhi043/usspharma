import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, Animated, Easing } from 'react-native';
import { Color } from './GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Splash = ({navigation}) => {
  const [circleScale] = useState(new Animated.Value(0));
  const [textColor] = useState(new Animated.Value(0));
  const [animatedText, setAnimatedText] = useState('');
  const [showSecondCircle, setShowSecondCircle] = useState(false);

  useEffect(() => {
    Animated.timing(circleScale, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(textColor, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: false, // Cannot use native driver for color animation
    }).start(() => setShowSecondCircle(true));

    const text = 'USS Pharma';
    let index = 0;
    const timer = setInterval(() => {
      setAnimatedText((prevText) => prevText + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(timer);
      }
    }, 200); // Adjust the duration between each letter here

    return () => clearInterval(timer);
  }, []);

  const circleStyles = {
    width: width * 2,
    height: height * 2,
    borderRadius: width,
    backgroundColor: Color.background2,
    position: 'absolute',
    left: -width / 2,
    top: -width / 2,
    transform: [{ scale: circleScale }],
  };

  const textStyles = {
    color: textColor.interpolate({
      inputRange: [0, 1],
      outputRange: [Color.background2, 'white'],
    }),
    fontSize: 55,
    fontWeight: '900',
    position: 'absolute',
    zIndex: 99999,
    top: '60%',
    marginLeft: '7%',
    lineHeight: 55,
  };

  const secondCircleStyles = {
    width: 200,
    height: 200,
    borderRadius: 500,
    backgroundColor: Color.white, // Change color as desired
    position: 'absolute',
    zIndex: 99999,
    alignSelf: 'center',
    top: '30%',
    display: showSecondCircle ? 'flex' : 'none',
    elevation:5,
  };









  setTimeout(async() => {

    const mydata = JSON.parse(await AsyncStorage.getItem('data'))
    const login = JSON.parse(await AsyncStorage.getItem('login'))

    console.log(mydata,login);
    if(mydata && login==='Admin'){
        navigation.navigate('Business')
    }
    if(mydata && login==='Employe'){
        navigation.navigate('Employee')
    }
    else if(!mydata && !login){
        navigation.navigate('Slider')
    }

  }, 3000);


  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={circleStyles} />
      <Animated.View style={secondCircleStyles} />
      <Animated.Text style={textStyles}>{animatedText}</Animated.Text>
    </View>
  );
};

export default Splash;
