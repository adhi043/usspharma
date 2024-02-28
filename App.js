import * as React from "react";
import { View, Text, Pressable, TouchableOpacity, StatusBar, LogBox } from "react-native";
import StackNavigator from "./src/StackNavigator";
import { Color } from "./src/GlobalStyles";
import Toast from 'react-native-toast-message';


const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <StackNavigator />
      <Toast position="top" />
    </>
  );
};
export default App;
