import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function editparametres() {
    return (
        <View style={styles.container}>
            <Text>Modif !</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backroundcolor: '#fff',
    alignItems: 'center',
  },
});