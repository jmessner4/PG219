import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import Parametres from './screens/parametres';
import Map from './screens/map';
import Balises from './screens/balises';
import Login from './screens/login';
import Signup from './screens/signup';
import { AuthProvider, useAuth } from './AuthContext';


const tab = createBottomTabNavigator();

const token = null;


export default function App() {
  return (
    <View>
    {(token === null) ? (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>  
    ) : (
      <NavigationContainer>
        <tab.Navigator screenOptions={ ({route}) => ({
          tabBarIcon: ({focused,color,size}) => {
            let iconName;
            if (route.name == 'Carte') {
              iconName = "map-outline"
            } else if (route.name == 'Paramètres') {
              iconName = "settings-outline"
            }
            else if (route.name == 'Balises') {
              iconName = "location-outline"
            }
            return <Ionicons name={iconName} size={25} />
          }
          })}>
          <tab.Screen name='Balises' component={Balises} />
          <tab.Screen name='Carte' component={Map} />
          <tab.Screen name='Paramètres' component={Parametres} />
        </tab.Navigator>
       </NavigationContainer>
    )}
    </View>
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
