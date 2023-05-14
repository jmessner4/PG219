import React from "react";
import { StyleSheet, ScrollView, View, Button } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import axios from "axios";
import { useState, useEffect } from "react";

const uri = "http://192.168.0.10:3000";

export default function Balises() {
  //Récupérer les caches
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
  //Créer une cache
  const [id, setId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [difficulte, setDifficulte] = useState("");
  const [description, setDescription] = useState("");
  const [createur, setCreateur] = useState("");

  //envoi d'une requète pour la récupération du username du joueur connecté
  const varcreateur = () => {
    axios
      .get(uri.concat("", "/createur"))
      .then((res) => {
        setCreateur(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  varcreateur();
  //réinitialisation des différents champs après chaque fermeture de popup
  const reinitialiser_champs = () => {
    setId("");
    setLatitude("");
    setLongitude("");
    setDifficulte("");
    setDescription("");
  };
  //Pour la popup de create
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
    //reinitialiser les champs de la popup
    reinitialiser_champs();
  };

  //La fonction handleCreate est la suivante
  const handleCreate = () => {
    axios
      .post(uri.concat("", "/create"), {
        id: Number(id),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        difficulte: difficulte,
        description: description,
        createur: createur,
      })
      .then((res) => {
        //Actualiser la nouvelle liste des caches
        AfficherCaches();
        //fermer la popup
        handleModal();
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Supprimer une cache
  const handleDelete = (id) => {
    axios
      .delete(uri.concat(`/delete/${id}`))
      .then((res) => {
        //Actualiser la nouvelle liste des caches
        AfficherCaches();
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //Modifier une cache
  const handleUpdate = (id) => {
    axios
      .put(uri.concat(`/update/${id}`), {
        id: Number(id),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        difficulte: difficulte,
        description: description,
        createur: createur,
      })
      .then((res) => {
        //Actualiser la nouvelle liste des caches
        AfficherCaches();
        handleModal();
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <View style={par.container}>
        <View style={par.button}>
          <Button title="Créer une nouvelle balise" onPress={handleModal} />
          <Modal isVisible={isModalVisible}>
            <View style={{ margin: 15, flex: 1 }}>
              <Button title="Annuler" onPress={handleModal} />
              <View style={par.buttonContainer}>
                <Text style={par.textName}>ID</Text>
                <TextInput
                  keyboardType="numeric"
                  required={true}
                  onChangeText={setId}
                  placeholderTextColor="#666666"
                  style={par.textButton}
                />
                <Text style={par.textName}>Difficulté</Text>
                <TextInput
                  required={true}
                  onChangeText={setDifficulte}
                  placeholderTextColor="#666666"
                  style={par.textButton}
                />
                <Text style={par.textName}>Description</Text>
                <TextInput
                  onChangeText={setDescription}
                  placeholderTextColor="#666666"
                  style={par.textButton}
                />
                <Text style={par.textName}>Latitude</Text>
                <TextInput
                  keyboardType="numeric"
                  required={true}
                  onChangeText={setLatitude}
                  placeholderTextColor="#666666"
                  style={par.textButton}
                />
                <Text style={par.textName}>Longitude</Text>
                <TextInput
                  keyboardType="numeric"
                  required={true}
                  onChangeText={setLongitude}
                  placeholderTextColor="#666666"
                  style={par.textButton}
                />
              </View>
              <Button title="Valider" onPress={handleCreate} />
            </View>
          </Modal>
        </View>

        <View style={par.user}>
          <Text style={par.txt}> Balises créées </Text>
        </View>

        {caches.map((cache, idx) => (
          <View style={par.userInfo} key={idx}>
            <View style={par.row}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}
              >
                {" "}
                {"Balise"} {cache.id}{" "}
              </Text>
            </View>
            <View style={par.row}>
              <Icon name="star" color="#777777" size={20} />
              <Text style={{ color: "#777777", paddingHorizontal: 20 }}>
                {" "}
                {cache.difficulte}{" "}
              </Text>
            </View>
            <View style={par.row}>
              <Icon name="comment-text-outline" color="#777777" size={20} />
              <Text style={{ color: "#777777", paddingHorizontal: 20 }}>
                {" "}
                {cache.description}{" "}
              </Text>
            </View>
            <View style={par.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#777777", paddingHorizontal: 20 }}>
                {" "}
                {cache.longitude} : {cache.latitude}{" "}
              </Text>
            </View>
            <View style={par.buttons}>
              <Button
                title="Supprimer"
                onPress={() => handleDelete(cache.id)}
              />
            </View>
          </View>
        ))}
      </View>
      <Button title="Modifier" onPress={handleModal} />
      <Modal isVisible={isModalVisible}>
        <View style={{ margin: 15, flex: 1 }}>
          <Button title="Annuler" onPress={handleModal} />
          <View style={par.buttonContainer}>
            <Text style={par.textName}>ID</Text>
            <TextInput
              keyboardType="numeric"
              required={true}
              onChangeText={setId}
              placeholderTextColor="#666666"
              style={par.textButton}
            />
            <Text style={par.textName}>Difficulté</Text>
            <TextInput
              required={true}
              onChangeText={setDifficulte}
              placeholderTextColor="#666666"
              style={par.textButton}
            />
            <Text style={par.textName}>Description</Text>
            <TextInput
              onChangeText={setDescription}
              placeholderTextColor="#666666"
              style={par.textButton}
            />
            <Text style={par.textName}>Latitude</Text>
            <TextInput
              keyboardType="numeric"
              required={true}
              onChangeText={setLatitude}
              placeholderTextColor="#666666"
              style={par.textButton}
            />
            <Text style={par.textName}>Longitude</Text>
            <TextInput
              keyboardType="numeric"
              required={true}
              onChangeText={setLongitude}
              placeholderTextColor="#666666"
              style={par.textButton}
            />
          </View>
          <Button title="Modifier" onPress={() => handleUpdate(id)} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const par = StyleSheet.create({
  container: {
    flex: 1,
    backroundcolor: "#fff",
  },
  user: {
    alignItems: "center",
    paddingTop: 15,
  },
  txt: {
    paddingTop: 10,
    paddingBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  userInfo: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    backroundcolor: "#f0f8ff",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 3,
  },
  button: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  buttons: {
    paddingHorizontal: 30,
    marginHorizontal: 40,
    paddingTop: 15,
    flexDirection: "row",
  },
  textButton: {
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#f0f8ff",
  },
  textName: {
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#f0f8ff",
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
