import React, { useState } from 'react';
import { StyleSheet, View,TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Homescreen from './homescreen';
import Signup from './signup';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const handleLogin = async() => {
        try {
            const response = await axios.post('http://172.20.10.3:3000/login', {
                email,
                password});
            const token = response.data.token;
            await AsyncStorage.setItem('token', token);
            navigation.navigate(Homescreen);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateAccount = async() => {
        try {
            navigation.navigate(Signup);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}e>
            <Text style={styles.heading}>Log In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeTest={setEmail}/>
            <TextInput 
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Create Account" onPress={handleCreateAccount} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
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
});

export default Login;