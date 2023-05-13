import React from "react";
import MapView, { Circle } from "react-native-maps";
import { StyleSheet, View, Button } from "react-native";
import { Marker } from "react-native-maps";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Text, TextInput } from "react-native-paper";
import * as Location from "expo-location";

const uri = "http://192.168.174.96:3000";

export default function App() {

  // Affichage de la géolocalisation
  const [location, setLocation] = useState(null);
  const radius = 1000;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);
  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  location.latitude = 44.8065219
  location.longitude = -0.607979

  //Récupération des caches avec la méthode axios
  const [caches, setCaches] = useState([]);
  const AfficherCaches = () => {
    axios
      .get(uri.concat("", "/caches"))
      .then((res) => {
        setCaches(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //Affichege de la liste des balises
  AfficherCaches();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const [PressedMarker, setPressedMarker] = useState({});
  const handleMarkerPress = (cache) => {
    setPressedMarker(cache);
    handleModal();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 46.583,
          longitude: 1.7315,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
      >

        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          key={0}
          title="My Location"
          description="This is my current location"
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


        {caches.map((cache, idx) => (
          <Marker
            coordinate={{
              latitude: cache.latitude,
              longitude: cache.longitude,
            }}
            key={idx}
            onPress={() => handleMarkerPress(cache)}
            pinColor="gold"
          >
            {(cache.latitude-location.latitude)<radius  && (cache.longitude - location.longitude)<radius && (
                <View style={styles.markerInfo}>
                <Text style={styles.markerInfoText}>{cache.title}</Text>
                </View>
            )}
          </Marker>
        ))}
      </MapView>
      <Modal isVisible={isModalVisible}>
        <View style={{ margin: 15, flex: 1 }}>
          <Button title="Annuler" onPress={handleModal} />
          <View style={par.buttonContainer}>
            <Text style={par.textName}>Balise {PressedMarker.id}</Text>
            <Text style={par.textName}>
              Localisation : {PressedMarker.latitude},{PressedMarker.longitude}
            </Text>
            <Text style={par.textName}>
              Description : {PressedMarker.description}
            </Text>
            <Text style={par.textName}>
              Difficulté : {PressedMarker.difficulte}
            </Text>
            <Text style={par.textName}>
              Créateur : {PressedMarker.createur}
            </Text>
            <Text style={par.textName}>Commentaire</Text>

            <TextInput
              placeholder="Vous pouvez écrire un commentaire"
              placeholderTextColor="#666666"
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
    width: "100%",
    height: "100%",
  },
});

const par = StyleSheet.create({
  container: {
    flex: 1,
    backroundcolor: "#fff",
  },
  textButton: {
    marginleft: 20,
    fontSize: 20,
    color: "#f0f8ff",
  },
  textName: {
    paddingTop: 20,
    marginleft: 20,
    fontSize: 20,
    color: "#f0f8ff",
  },
});