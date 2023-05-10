import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Map() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} />
      </View>
    )
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