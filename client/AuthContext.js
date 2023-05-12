import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const TOKEN_KEY = 'my-jwt';
export const API_URL = '../server/usersConnect.js';
const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        authent: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored:", token);

            if(token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authent: true
                });
            }
        }
        loadToken();
    }, []);
    
    const register = async () => {
        try {
            return await axios.post(`${API_URL}/signup`, {email, password});
        } catch (e) {
            return {error: true, msg: e.response.data.message};
        }
    };

   const login = async () => {
        try {
            const result =  await axios.post(`${API_URL}/login`, {email, password});

            setAuthState({
                token: result.data.token,
                authent: true,
            });
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

            return result;
            
        } catch (e) {
            return {error: true, msg: e.response.data.message};
        }
    };

    const logout = async() => {

        await SecureStore.deleteItemAsync(TOKEN_KEY);       //Delete token

        axios.defaults.headers.common['Authorization'] = '';    //update http headers
        
        setAuthState({              //Reset Authentification state
            token: null,
            authent: false
        });
    };


    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};