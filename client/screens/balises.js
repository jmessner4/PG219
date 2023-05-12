import React from 'react';
import { StyleSheet, ScrollView, View, Button } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import axios from 'axios';
import { useState, useEffect } from 'react';


const uri = 'http://192.168.174.96:3000';


export default function Balises() {

    //Récupérer les caches
    const [caches, setCaches] = useState([])
    useEffect(() => {
        axios.get(uri.concat('','/caches'))
        .then(res => {
            setCaches(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])


  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);


    // Créer un cache
    const createModal = () =>  {
        const del = uri.concat('','/create')
        console.log(del)
        /*useEffect(() => {
        axios.create(del)
            .then(res => {
                console.log("Delete successful")
            })
            .catch(error => {
                console.log(error)
            })
        }, [])*/
        handleModal()
    };


    // Modifier un cache avec son id
    const modifModal = (id) =>  {
        const del = uri.concat('','/update/').concat('',id)
        console.log(del)
        /*useEffect(() => {
        axios.update(del)
            .then(res => {
                console.log("Delete successful")
            })
            .catch(error => {
                console.log(error)
            })
        }, [])*/
        handleModal()
    };

    // Supprimer des caches avec leurs id
    const supprModal = (id) => {
        const del = uri.concat('','/delete/').concat('',id)
        console.log(del)
        /*useEffect(() => {
        axios.delete(del)
            .then(res => {
                console.log("Delete successful")
            })
            .catch(error => {
                console.log(error)
            })
        }, [])*/
    };

return (
    <ScrollView>
    <View style={par.container}>
      
      <View style={par.button}>
        <Button title="Créer une nouvelle balise" onPress={handleModal} />
        <Modal isVisible={isModalVisible}>

          <View style={{margin: 15, flex: 1}}>
            <Button title="Annuler" onPress={handleModal} />
            <View style={par.buttonContainer}>
              <Text style={par.textName}>Difficulté</Text>
              <TextInput
                placeholder={'...'}
                placeholderTextColor='#666666'
                style={par.textButton}
              />
              <Text style={par.textName}>Description</Text>
              <TextInput
                placeholder={'...'}
                placeholderTextColor='#666666'
                style={par.textButton}
              />
              <Text style={par.textName}>Latitude</Text>
              <TextInput
                placeholder={'...'}
                placeholderTextColor='#666666'
                style={par.textButton}
              />
              <Text style={par.textName}>Longitude</Text>
              <TextInput
                placeholder={'...'}
                placeholderTextColor='#666666'
                style={par.textButton}
              />
            </View>
            <Button title="Valider" onPress={()=>createModal()} />
          </View>

        </Modal>
      </View>

      <View style={par.user}>
        <Text style={par.txt}> Balises créées </Text>
      </View>

      {caches.map((cache,idx) => (
        <View style={par.userInfo} key={cache.id}>
          <View style={par.row}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}> {'Balise' } {cache.id} </Text>
          </View>
          <View style={par.row}>
            <Icon name="star" color="#777777" size={20}/>
            <Text style={{color:"#777777", paddingHorizontal: 20}}> {cache.difficulte} </Text>
          </View>
          <View style={par.row}>
            <Icon name="comment-text-outline" color="#777777" size={20}/>
            <Text style={{color:"#777777", paddingHorizontal: 20}}> {cache.description} </Text>
          </View>
          <View style={par.row}>
            <Icon name="map-marker-radius" color="#777777" size={20}/>
            <Text style={{color:"#777777", paddingHorizontal: 20}}> {cache.longitude} : {cache.latitude} </Text>
          </View>

          <View style={par.buttons}>
            <Button title="Modifier" onPress={handleModal} />
            <Modal isVisible={isModalVisible}>

              <View style={{flex: 1}}>
                <Button title="Annuler" onPress={handleModal} />
                <View style={par.buttonContainer}>
                  <Text style={par.textName}>Difficulté</Text>
                  <TextInput
                    placeholder={cache.difficulte}
                    placeholderTextColor='#666666'
                    style={par.textButton}
                  />
                  <Text style={par.textName}>Description</Text>
                  <TextInput
                    placeholder={cache.description}
                    placeholderTextColor='#666666'
                    style={par.textButton}
                  />
                  <Text style={par.textName}>Latitude</Text>
                  <TextInput
                    numericvalue
                    keyboardType={'numeric'}
                    placeholder={cache.latitude.toString()}
                    placeholderTextColor='#666666'
                    style={par.textButton}
                  />
                  <Text style={par.textName}>Longitude</Text>
                  <TextInput
                    numericvalue
                    keyboardType={'numeric'}
                    placeholder={cache.longitude.toString()}
                    placeholderTextColor='#666666'
                    style={par.textButton}
                  />
                </View>
                <Button title="Valider" onPress={()=>modifModal(cache.id)} />
              </View>
            </Modal>

            <Button title="Supprimer" onPress={()=>supprModal(cache.id)} />
          </View>
        </View>
      ))}

    </View>
  </ScrollView>
)}

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
    backroundcolor: '#f0f8ff'
  },
  row: {
    flexDirection: 'row',
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
    flexDirection: 'row'
  },
  textButton: {
    paddingHorizontal: 20,
    fontSize: 20,
    color: '#f0f8ff'
  },
  textName: {
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    color: '#f0f8ff'
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 20
  }
});
