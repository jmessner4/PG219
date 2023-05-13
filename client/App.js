import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import Opening from './screens/opening';
import Login from './screens/login';
import Signup from './screens/signup';
import Homescreen from './screens/homescreen';

const Stack = createStackNavigator();

const tab = createBottomTabNavigator();

const token = null;


export default function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator>
        {/* Screens
        <Stack.Screen name="Opening" component={Opening} options={{ headerLeft: null }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerLeft: null }} />
        <Stack.Screen name="Login" component={Login} options={{ headerLeft: null }} />
        */}
        <Stack.Screen name="Géocach'eirb" component={Homescreen} options={{ headerLeft: null }}/>
      </Stack.Navigator>
  
      
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backroundcolor: '#fff',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
