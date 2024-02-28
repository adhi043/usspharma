import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { Color, FontSize } from './GlobalStyles';
import ShieldExclamationIcon from 'react-native-heroicons/solid/ShieldExclamationIcon';
import XMarkIcon from "react-native-heroicons/solid/XMarkIcon";
import CheckBadgeIcon from 'react-native-heroicons/solid/CheckBadgeIcon';
import { useFocusEffect } from '@react-navigation/native';

const Noti = forwardRef(({ type, msg, timeout = 1000 }, ref) => {
  const [display, setDisplay] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (display) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setDisplay(false));

        clearTimeout(timer);
      }, timeout);
    }
  }, [display]);

  useImperativeHandle(ref, () => ({
    show: () => setDisplay(true),
  }));

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: '8%',
        left: 20,
        backgroundColor: type === 'Error' ? Color.error : Color.colorMediumseagreen,
        padding: 20,
        zIndex: 99999999999999,
        width: Dimensions.get('screen').width - 40,
        borderRadius: 20,
        opacity,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10 }}>
          {type === 'Error' ? <ShieldExclamationIcon size={20} color={Color.white} /> : <CheckBadgeIcon size={20} color={Color.white} />}
          <Text style={{ color: Color.white, fontSize: FontSize.font_size, fontWeight: '600' }}>{type}</Text>
        </View>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => setDisplay(false)}>
          <XMarkIcon size={18} color={Color.white} />
        </TouchableOpacity>
      </View>
      <Text style={{ color: Color.white, fontSize: FontSize.font1_size, paddingTop: '10px', paddingLeft: 30 }}>{msg}</Text>
    </Animated.View>
  );
});

export default Noti;
