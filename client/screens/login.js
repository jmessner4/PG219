import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Homescreen from "./homescreen";
import Signup from "./signup";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.0.10:3000/login", {
        email: email,
        password: password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      if (token) {
        navigation.navigate(Homescreen);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      navigation.navigate(Signup);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container} e>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create Account" onPress={handleCreateAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "100%",
    height: 50,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});

export default Login;
