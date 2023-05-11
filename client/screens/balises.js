import * as React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function Balises() {
  
   return(
      

      <View style={styles.container}>
        <Text>Balises !</Text>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backroundcolor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});