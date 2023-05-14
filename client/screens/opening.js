import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from "./signup";
import Login from "./login";

const Stack = createStackNavigator();

const Opening = ({ navigation }) => {

   
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo(1024).png')}
                style={styles.image}
            />
            <Text style={styles.heading}>Welcome to Geo Cach'eirb !</Text>
            <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
            <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 30,
        foncWeight: 'bold',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        backgroundColor: '#6495ed',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default Opening;