import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import {Marker} from 'react-native-maps';
import axios from 'axios';
import { useState, useEffect } from 'react';
//Création de la carte géographique

export default function App() {
  //Récupération des caches avec la méthode axios
  const [caches, setCaches] = useState([])
    useEffect(() => {
        axios.get('http://10.3.25.212:3000/caches')
            .then(res => {
                setCaches(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
  
 
      
  return (
    <View style={styles.container}>
      
 
    <MapView style={styles.map} initialRegion={{
    latitude: 46.583,
    longitude: 1.7315,
    latitudeDelta: 8,
    longitudeDelta: 8,
  }}   showsUserLocation = {true}>
    
    {caches.map((cache,idx) => (
                        <Marker
                            coordinate={{latitude: cache.latitude, longitude: cache.longitude}}
                            key={idx}                          
                        ></Marker>
                        
                    ))}
    </MapView>
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
