import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";


export default function Parametres( {navigation} ) {

  let Name = "Maya Legris";
  let Email = "bouclq@vqv";
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

          <View style={{margin: 20, flex: 1}}>
            <Button title="Annuler" onPress={handleModal} />
            <View style={{alignItems: 'center'}}>
              <Text style={par.textButton}> Hello! </Text>
            </View>
            <Button title="Modifier" onPress={modifModal} />
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
    paddingVertical: 15,
  },
  textButton: {
    paddingTop: 10,
    paddingBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
    
  }
});