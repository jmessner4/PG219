import React, { useState } from 'react';
import { ImageBackgroundComponent, StyleSheet, View,TextInput, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Map from './map';
import Signup from './signup';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    const handleLogin = async() => {
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                username,
                password});
            const token = response.data.token;
            await AsyncStorage.setItem('token', token);
            props.navigation.navigate(Map);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateAccount = async() => {
        try {
            props.navigation.navigate(Signup);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}e>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeTest={setUsername}/>
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

    input: {
        width: '80%',
        padding: 30,
        borderWidth: 2,
        marginVertical: 10,
    },
});

export default Login;