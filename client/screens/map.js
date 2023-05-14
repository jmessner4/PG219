/**************Création de la carte géographique***************/

import React from "react";
import MapView, { Circle } from "react-native-maps";
import { StyleSheet, View, Button, ScrollView } from "react-native";
import { Marker } from "react-native-maps";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Text, TextInput } from "react-native-paper";
import * as Location from "expo-location";
const uri = "http://192.168.0.10:3000";

export default function App() {
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

  //Pour la popup de create
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
  };
  /*Lorsque le joueur clique sur un marqueur une popup s'affiche
   contenant les infos de la cache et un espace de commentaire concernant cette cache*/
  const [PressedMarker, setPressedMarker] = useState({});
  const handleMarkerPress = (cache) => {
    setPressedMarker(cache);
    handleModal();
  };
  //En cas d'ajout de commentaire et d'appui sur valider
  //La fonction handleCreate est la suivante
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  //envoi d'une requète pour la récupération du username du joueur connecté
  const getUser = () => {
    axios
      .get(uri.concat("", "/username"))
      .then((res) => {
        setUsername(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getUser();
  const createComment = () => {
    axios
      .post(uri.concat("", "/commentaire"), {
        idbalise: PressedMarker.id,
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
          latitude: 46.583,
          longitude: 1.7315,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
      >
        {caches.map((cache, idx) => (
          <Marker
            coordinate={{
              latitude: cache.latitude,
              longitude: cache.longitude,
            }}
            key={idx}
            onPress={() => handleMarkerPress(cache)}
            pinColor="gold"
          ></Marker>
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
              onChangeText={setComment}
              style={par.textButton}
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
