import React from "react";
import { StyleSheet, ScrollView, View, Button } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useState, useEffect } from "react";

const uri = "http://192.168.174.96:3000";
export default function Commentaire() {
  //Récupération des différents commentaires
  const [comments, setComments] = useState([]);
  //Pour refraichir la page

  const AfficherCommentaire = () => {
    axios
      .get(uri.concat("", "/comments"))
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  AfficherCommentaire();
  return (
    <ScrollView>
      <View style={par.container}>
        {comments.map((comment, idx) => (
          <View style={par.userInfo} key={idx}>
            <View style={par.row}>
              <Icon name="account" color="#777777" size={20} />
              <Text style={{ color: "#777777", paddingHorizontal: 20 }}>
                {" "}
                {comment.username}{" "}
              </Text>
            </View>
            <View style={par.row}>
              <Icon name="map-marker" color="#777777" size={20} />
              <Text style={{ color: "#777777", paddingHorizontal: 20 }}>
                {" "}
                {comment.idbalise}{" "}
              </Text>
            </View>
            <View style={par.row}>
              <Icon name="comment-text-outline" color="#777777" size={20} />
              <Text style={{ color: "#777777", paddingHorizontal: 20 }}>
                {" "}
                {comment.commentaire}{" "}
              </Text>
            </View>
          </View>
        ))}
      </View>
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
