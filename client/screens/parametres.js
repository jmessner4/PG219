import * as React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import axios from "axios";

const uri = "http://192.168.174.96:3000";


export default function Parametres( {navigation} ) {

  //let Name = "Maya Legris";
  let Email = "bouclq@vqv";
  let Ville = "Bordeaux";
  let Pays = "France";
  let Password = "xxxxx";


  //Récupération des différents commentaires
  const [Name, setName] = useState([]);
  //Pour refraichir la page

  const GetName = () => {
    axios
      .get(uri.concat("", "/username"))
      .then((res) => {
        setName(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  GetName();



  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const modifModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <View style={par.container}>
      <View style={par.user}>
        <Image
          source={require('../assets/logo(1024).png')}
          style={par.image}
        />
        <Text style={par.txt}> {Name}</Text>
      </View>

      <View style={par.userInfo}>
          <View style={par.row}>
            <Icon name="map-marker-radius" color="#777777" size={20}/>
            <Text style={{color:"#777777", PaddingLeft: 20}}> {Ville}, {Pays} </Text>
          </View>
          <View style={par.row}>
            <Icon name="email" color="#777777" size={20}/>
            <Text style={{color:"#777777", PaddingLeft: 20}}> {Email} </Text>
          </View>
      </View>
      
      <View style={par.button}>
        <Button title="Modifier les informations" onPress={handleModal} />
        <Modal isVisible={isModalVisible}>

          <View style={{margin: 15, flex: 1}}>
            <Button title="Annuler" onPress={handleModal} />
            <View style={par.buttonContainer}>
              <Text style={par.textName}>Prénom Nom</Text>
              <TextInput
                placeholder={Name}
                placeholderTextColor='#666666'
                autoCorrect={false}
                style={par.textButton}
              />
              <Text style={par.textName}>Password</Text>
              <TextInput
                placeholder={Password}
                placeholderTextColor='#666666'
                autoCorrect={false}
                style={par.textButton}
              />
              <Text style={par.textName}>Ville</Text>
              <TextInput
                placeholder={Ville}
                placeholderTextColor='#666666'
                autoCorrect={false}
                style={par.textButton}
              />
              <Text style={par.textName}>Pays</Text>
              <TextInput
                placeholder={Pays}
                placeholderTextColor='#666666'
                autoCorrect={false}
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