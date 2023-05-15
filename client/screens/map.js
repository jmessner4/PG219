import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import { Marker } from "react-native-maps";
import { Circle } from "react-native-maps";
import axios from "axios";
import Modal from "react-native-modal";
import * as Location from "expo-location";
import MapView from "react-native-maps";

<<<<<<< HEAD
const uri = "http://172.20.10.3:3000";
=======
const uri = "http://192.168.102.96:3000";
>>>>>>> refs/remotes/origin/main

export default function App() {
  const [location, setLocation] = useState(null);
  const [caches, setCaches] = useState([]);
  const [pressedMarker, setpressedMarker] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState([]);

  const radius = 10000;

  // Géolocalisation
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);

  // Récupérer les caches
  useEffect(() => {
    const fetchCaches = async () => {
      try {
        const res = await axios.get(uri.concat("", "/caches"));
        setCaches(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCaches();
  }, []);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }




  function calculateDistance(mark1, mark2) {
    const earthRadius = 6371 * 1000; // Rayon moyen de la Terre en mètres
    const dLat = toRadians(mark1.latitude - mark2.latitude);
    const dLon = toRadians(mark1.longitude - mark2.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(mark1.latitude)) * Math.cos(toRadians(mark2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }


  // Fenetre pop-up
  const handleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };
  const handleMarkerPress = (cache) => {
    setpressedMarker(cache);
    handleModal();
  };

  
  //envoi d'une requète pour la récupération du username du joueur connecté
  const getUser = async () => {
    try {
      const res = await axios.get(uri.concat("", "/username"));
      setUsername(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  getUser();


  // Création d'un commentaire
  const createComment = () => {
    axios
      .post(uri.concat("", "/commentaire"), {
        idbalise: pressedMarker.id,
        username: username,
        commentaire: comment,
      })
      .then((res) => {
        //fermer la popup
        handleModal();
        setComment("");
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
      >

        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Ma position"
          description="Je suis ici"
          pinColor="blue"
        />

        <Circle
          center={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          radius={radius}
          strokeColor="rgba(158, 158, 255, 0.5)" // Spécifiez la couleur du trait du cercle
          fillColor="rgba(158, 158, 255, 0.2)" // Spécifiez la couleur de remplissage du cercle
        />

        {caches.map((cache, idx) => {
          const distance = calculateDistance(cache, location);
          if (distance < radius) {
            return (
              <Marker
                coordinate={{
                  latitude: cache.latitude,
                  longitude: cache.longitude,
                }}
                key={idx}
                onPress={() => handleMarkerPress(cache)}
                pinColor="gold"
              />
            );
          }
          return null;
          // Ignorer les marqueurs qui ne satisfont pas la condition
        })}

      </MapView>

      <Modal isVisible={isModalVisible}>
        <View style={{ margin: 15, flex: 1 }}>
          <Button title="Annuler" onPress={handleModal} />
          <View style={styles.buttonContainer}>
            <Text style={styles.textName}>Balise {pressedMarker.id}</Text>
            <Text style={styles.textName}>
              Localisation : {pressedMarker.latitude},{pressedMarker.longitude}
            </Text>
            <Text style={styles.textName}>
              Description : {pressedMarker.description}
            </Text>
            <Text style={styles.textName}>
              Difficulté : {pressedMarker.difficulte}
            </Text>
            <Text style={styles.textName}>
              Créateur : {pressedMarker.createur}
            </Text>
            <Text style={styles.textName}>Commentaire</Text>
            <TextInput
              placeholder="Vous pouvez écrire un commentaire"
              placeholderTextColor="#666666"
              autoCorrect={false}
              onChangeText={setComment}
              style={styles.textButton}
            />
          </View>
          <Button title="Valider" onPress={createComment} />
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backroundcolor: '#fff',
  },
  map: {
    width: "100%",
    height: "100%",
  },
  textButton: {
    paddingLeft: 20,
    fontSize: 20,
    color: "#f0f8ff",
  },
  textName: {
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 20,
    color: "#f0f8ff",
  },
});