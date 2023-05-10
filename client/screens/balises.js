import * as React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function Balises() {
  const persons = [
    {
    id: "1",
    name: "Earnest Green",
    },
    {
    id: "2",
    name: "Winston Orn",
    },
    {
    id: "3",
    name: "Carlton Collins",
    },
    {
    id: "4",
    name: "Malcolm Labadie",
    },
    {
    id: "5",
    name: "Michelle Dare",
    },
    {
    id: "6",
    name: "Carlton Zieme",
    },
    {
    id: "7",
    name: "Jessie Dickinson",
    },
    {
    id: "8",
    name: "Julian Gulgowski",
    },
    {
    id: "9",
    name: "Ellen Veum",
    },
    {
    id: "10",
    name: "Lorena Rice",
    },
  
    {
    id: "11",
    name: "Carlton Zieme",
    },
    {
    id: "12",
    name: "Jessie Dickinson",
    },
    {
    id: "13",
    name: "Julian Gulgowski",
    },
    {
    id: "14",
    name: "Ellen Veum",
    },
    {
    id: "15",
    name: "Lorena Rice",
    },
  ];

    return (
      <View style={styles.container}>
      {persons.map((person) => {
        return (
          <View>
            <Text style={styles.item}>{person.name}</Text>
          </View>
        );
      })}
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