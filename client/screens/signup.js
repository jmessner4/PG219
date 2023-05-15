import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Homescreen from "./homescreen";
import Login from "./login";
import { ScrollView } from "react-native-gesture-handler";

const uri = "http://172.20.10.3:3000";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post(uri.concat("", "/signup"), {
        email,
        username,
        password,
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

  const handleLogin = () => {
    try {
      navigation.navigate(Login);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Create Account" onPress={handleCreateAccount} />

      <Button title="Login" onPress={handleLogin} />
    </View>
    </ScrollView>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
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

export default Signup;
