import React from 'react';
import MapView, { Circle } from 'react-native-maps';
import { StyleSheet, View,Button } from 'react-native';
import {Marker} from 'react-native-maps';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from "react-native-modal";
import { Text, TextInput } from 'react-native-paper';
import { Location  } from 'expo';

//Création de la carte géographique

export default function App() {
  //Récupération des caches avec la méthode axios
  const [caches, setCaches] = useState([])
    useEffect(() => {
        axios.get('http://192.168.174.96:3000/caches')
            .then(res => {
                setCaches(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

  
const [isModalVisible, setIsModalVisible] = React.useState(false);
const handleModal = () => setIsModalVisible(() => !isModalVisible);

const [PressedMarker, setPressedMarker] = useState({});
const handleMarkerPress = (cache) => {
  setPressedMarker(cache);
  handleModal();
};



 const [userLocation, setUserLocation] = useState(null);


 useEffect(() => {
 (async () => {
  let {status} = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
  }
  let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
  setUserLocation({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }) })()
}, [])




  return (
    <View style={styles.container}>
    <MapView style={styles.map} initialRegion={{
      latitude: 46.583,
      longitude: 1.7315,
      latitudeDelta: 8,
      longitudeDelta: 8,
  }}>

    {userLocation && <Marker coordinate={userLocation.coords} />}

    {caches.map((cache,idx) => (
      <Marker
          coordinate={{latitude: cache.latitude, longitude: cache.longitude}}
          key={idx}  
          onPress={()=>handleMarkerPress(cache)}  
          pinColor='gold'                     
      ></Marker>                  
    ))}
     
    </MapView>
    <Modal isVisible={isModalVisible}>

          <View style={{margin: 15, flex: 1}}>
             <Button title="Annuler" onPress={handleModal} />
             <View style={par.buttonContainer}>

             <Text style={par.textName}>Balise  {PressedMarker.id}</Text>
             <Text style={par.textName} >Localisation : {PressedMarker.latitude},{PressedMarker.longitude}</Text>
             <Text style={par.textName} >Description : {PressedMarker.description}</Text>
             <Text style={par.textName} >Difficulté : {PressedMarker.difficulte}</Text>
             <Text style={par.textName} >Créateur : {PressedMarker.createur}</Text>
             <Text style={par.textName}>Commentaire</Text>
              
             <TextInput
                placeholder="Vous pouvez écrire un commentaire"
                placeholderTextColor='#666666'
                autoCorrect={false}
                style={par.textButton}
              />
            </View>
            <Button title="Valider" onPress={handleModal} />
          </View>

        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});


const par = StyleSheet.create({
  container: {
    flex: 1,
    backroundcolor: '#fff',
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
  }
});