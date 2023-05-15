import React from "react";
import { StyleSheet, ScrollView, View, Button, Image } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import axios from "axios";
import { useState, useEffect } from "react";

const uri = "http://172.20.10.3:3000";

export default function Parametres() {
  //Récupérer les données de l'utilisateur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  let Ville = "Bordeaux";
  let Pays = "France";

  const GetUser = async () => {
    try {
      const res = await axios.get(uri.concat("", "/userinfo"));
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  GetUser();


  //réinitialisation des différents champs après chaque fermeture de popup
  const reinitialiser_champs = () => {
    setEmail("");
    setPassword("");
  };

  //Pour la popup
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
    //reinitialiser les champs de la popup
    reinitialiser_champs();
  };

  //Modifier les paramètres
  const modifModal = () => {
    axios
      .put(uri.concat(`/updateuser`), {
        email: email,
        password: password,
      })
      .then((res) => {
        //Actualiser les nouvelles données
        GetUser();
        handleModal();
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={par.container}>
      <View style={par.user}>
        <Image
          source={require('../assets/logo(1024).png')}
          style={par.image}
        />
        <Text style={par.txt}> {user.username}</Text>
      </View>

      <View style={par.userInfo}>
          <View style={par.row}>
            <Icon name="map-marker-radius" color="#777777" size={20}/>
            <Text style={{color:"#777777", PaddingLeft: 20}}> {Ville}, {Pays} </Text>
          </View>
          <View style={par.row}>
            <Icon name="email" color="#777777" size={20}/>
            <Text style={{color:"#777777", PaddingLeft: 20}}> {user.email} </Text>
          </View>
      </View>
      
      <View style={par.button}>
        <Button title="Modifier les informations" onPress={handleModal} />
        <Modal isVisible={isModalVisible}>

          <View style={{margin: 15, flex: 1}}>
            <Button title="Annuler" onPress={handleModal} />
            <View style={par.buttonContainer}>
              <Text style={par.textName}>Nouveau Mot de Passe</Text>
              <TextInput
                required={true}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholderTextColor="#666666"
                style={par.textButton}
              />
              <Text style={par.textName}>Nouveau Email</Text>
              <TextInput
                required={true}
                onChangeText={setEmail}
                placeholderTextColor="#666666"
                style={par.textButton}
              />
            </View>
            <Button title="Valider" onPress={modifModal} />
          </View>

        </Modal>
      </View>
    </View>
  )
}

const par = StyleSheet.create({
  container: {
    flex: 1,
    backroundcolor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
  },
  user: {
    alignItems: 'center',
    paddingTop: 15,
  },
  txt: {
    paddingTop: 10,
    paddingBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  userInfo: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  button: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  textButton: {
    paddingLeft: 20,
    fontSize: 20,
    color: '#f0f8ff'
  },
  textName: {
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 20,
    color: '#f0f8ff'
  },
  buttonContainer: {
    marginBottom: 20,
    paddingLeft: 20
  }
});