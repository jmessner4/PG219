import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Avatar, Title, Caption, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import { FontAwesome } from '@expo/vector-icons';
import jwtDecode from 'jwt-decode';

const jwt = require('jsonwebtoken');
const secret = "JV5SHhjh_nnjnsj578snilq_nsjqk#dK";


export default function Parametres( {navigation} ) {
  const name = "John Doe";
  const email = " ";

  useEffect(() => {
   if (typeof window !== 'undefined' && window.localStorage) {
      // Vérifie si un token est enregistré
      token = localStorage.getItem('token');
      if (token) {
        name = localStorage.getItem('name');
        email = localStorage.getItem('email');
      } else {
        console.log('no token');
      }
    }
  }, []);

 

  let Name = name;
  let Email = email;
  let Ville = "Bordeaux";
  let Pays = "France";
  let Password = "xxxxx";

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const modifModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <View style={par.container}>
      <View style={par.user}>
        <Avatar.Image
          source={{
            uri: 'https://thumbs.dreamstime.com/b/avatar-principal-d-ic%C3%B4ne-de-profil-vide-homme-pour-les-sites-web-des-m%C3%A9dias-sociaux-208480728.jpg'
          }}
          size={80}
        />
          <Text style={par.txt}> {Name}</Text>
      </View>

      <View style={par.userInfo}>
          <View style={par.row}>
            <Icon name="map-marker-radius" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginleft: 20}}> {Ville}, {Pays} </Text>
          </View>
          <View style={par.row}>
            <Icon name="email" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginleft: 20}}> {Email} </Text>
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
    marginleft: 20,
    fontSize: 20,
    color: '#f0f8ff'
  },
  textName: {
    paddingTop: 20,
    marginleft: 20,
    fontSize: 20,
    color: '#f0f8ff'
  },
  buttonContainer: {
    marginBottom: 20,
    marginleft: 20
  }
});