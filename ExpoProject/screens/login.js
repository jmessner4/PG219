import React, { useState } from 'react';
import { ImageBackgroundComponent, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-web';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();

    return (
        <View>
            <Text>Login</Text>
        </View>
    );
}