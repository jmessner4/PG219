const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


const MongoClient = require('mongodb').MongoClient;
const ClientID = require('mongodb').ClientID;

// const url = 'mongodb://localhost:27017';
const url = 'mongodb://0.0.0.0:27017'; 

// On ouvre une connexion à notre base de données
MongoClient.connect(url)
  // On commence par récupérer la collection que l'on va utiliser et la passer
  .then(function (client) {
    return client.db("clients_manager").collection("clients");
  })

  .then((products) => { // Rajouter vos routes et les traitements

    app.get("/clients", (req, res) => {
        console.log("GET");
        products.find().toArray()
            .then(items => res.json(items))
    })

    app.listen(3000, () => console.log("En attente de requêtes..."))
  })
  .catch(function (err) {
    throw err;
  });