const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const ClientMongo = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const caches_model = require('./models/caches');
const users_model = require('./models/users');
const model_commentaires = require('./models/commentaires.js');
const jwt = require("jsonwebtoken");

//const uri = 'mongodb://0.0.0.0:27017/geocachdb';
// Connection URL
const uri = 'mongodb://0.0.0.0:27017';
// Database Name
const dbName = 'geocachdb';

// Create a new MongoClient
const client = new ClientMongo(uri);
// Connect to the MongoDB server
client.connect(function(err) {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connexion réussie à la base de données');

  // Create the "caches" collection
  const cachesCollection = client.db(dbName).createCollection('caches', function(err, res) {
    if (err) throw err;
    console.log('Collection "caches" créée avec succès');
  });
  // Create the "commentaires" collection
  const commentairesCollection = client.db(dbName).createCollection('commentaires', function(err, res) {
    if (err) throw err;
    console.log('Collection "commentaires" créée avec succès');
  });
  // Create the "users" collection
  const usersCollection = client.db(dbName).createCollection('users', function(err, res) {
    if (err) throw err;
    console.log('Collection "users" créée avec succès');
  });

  // Close the connection to the MongoDB server
  client.close();
});

// Connection URL
const uri = 'mongodb://0.0.0.0:27017';
// Database Name
const dbName = 'geocachdb';

// Create a new MongoClient
const client = new ClientMongo(uri);
// Connect to the MongoDB server
client.connect(function(err) {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connexion réussie à la base de données');

  // Create the "caches" collection
  const cachesCollection = client.db(dbName).createCollection('caches', function(err, res) {
    if (err) throw err;
    console.log('Collection "caches" créée avec succès');
  });
  // Create the "commentaires" collection
  const commentairesCollection = client.db(dbName).createCollection('commentaires', function(err, res) {
    if (err) throw err;
    console.log('Collection "commentaires" créée avec succès');
  });
  // Create the "users" collection
  const usersCollection = client.db(dbName).createCollection('users', function(err, res) {
    if (err) throw err;
    console.log('Collection "users" créée avec succès');
  });

  // Close the connection to the MongoDB server
  client.close();
});

const secret = "JV5SHhjh_nnjnsj578snilq_nsjqk#dK";
const options = { expiresIn: "2d" };

app.listen(3000, () => {
  console.log("serveur démarré avec succès");
});
app.use(bodyParser.json());
//connexion à la base de donnée

mongoose
  .connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error"));


///////////////////////////////////// A commenter si reload /////////////////////////////////////////

// Créer une cache
const cacheData = {
  _id: '6461f5be1fab6480723f9143',
  id: 2,
  longitude: -0.574684,
  latitude: 44.841701,
  createur: 'Nous',
  difficulte: 'medium',
  description: 'plage'
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////



// Insertion dans la collection "caches"
caches_model.collection.insertOne(cacheData, function(err, result) {
  if (err) throw err;
  console.log('Données insérées avec succès');
});



/*****************Gestion des caches****************/

//Création d'une fonction qui controle si la valeur d'un champ est vide
function vide(valeur) {
  if (
    valeur === null ||
    (typeof valeur === "string" && valeur.trim().length === 0) ||
    (typeof valeur === "number" && valeur === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

// en cas de requete create
app.post("/create", async (req, res) => {
  //le serveur vérifie si le champ id est unique et  non vide
  if (
    vide(req.body.id) ||
    vide(req.body.difficulte) ||
    vide(req.body.latitude) ||
    vide(req.body.longitude)
  ) {
    return res.status(404).json({ message: "vide" });
  }
  //si ce n'est pas vide on vérifie si l'id existe ou pas
  else {
    const cache = await caches_model.collection.findOne({ id: req.body.id });
    if (cache) {
      return res.status(404).json({ message: "cache existante" });
    } else {
      //on peut aussi utiliser la fonction create qui nous retourne l'element crée
      caches_model.collection
        .insertOne(req.body)
        .then(() => {
          return res.status(200).json({ message: "success" });
        })
        .catch(res.status(400));
    }
  }
});
//en cas de requete de récupération
app.get("/caches", (req, res) => {
  caches_model
    .find({})
    .then((caches) => res.status(200).json(caches))
    .catch(res.status(400));
});
//update
app.put("/update/:id", async (req, res) => {
  if (
    vide(req.body.difficulte) ||
    vide(req.body.latitude) ||
    vide(req.body.longitude) ||
    vide(req.body.description)
  ) {
    return res.status(404).json({ message: "vide" });
  } else {
    caches_model
      .updateOne({ id: req.params.id }, req.body)
      .then(() => {
        return res.status(200).json({ message: "success" });
      })
      .catch(res.status(400));
  }
});
//delete
app.delete("/delete/:id", (req, res) => {
  caches_model
    .deleteOne({ id: req.params.id })
    .then((caches) => res.status(200).json(caches))
    .catch(res.status("400"));
});

/*définition d'une variable username qui va prendre le username du joueur connecté
 afin de l'utilisé coté frontend*/
var username;
/**************signup et signin***************/

app.post("/login", async (req, res) => {
  //le serveur vérifie si le champ id est unique et  non vide
  if (vide(req.body.email) || vide(req.body.password)) {
    return res.status(404).json({ message: "vide" });
  }
  //si ce n'est pas vide on vérifie si l'id existe ou pas
  else {
    const mail = await users_model.collection.findOne({
      email: req.body.email,
    });
    if (mail) {
      if (req.body.password === mail.password) {
        username = mail.username;
        const token = jwt.sign({ id: req.body.email }, "secret");

        return res.status(200).json({ token: token });
      } else {
        res.status(404).json({ message: "Email ou mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ message: "Email ou mot de passe incorrect" });
    }
  }
});

//en cas de réception d'une requète de récupération du username
app.get("/username", (req, res) => {
  res.send(username);
});

//en cas de requete de récupération user
app.get("/userinfo", async (req, res) => {
  const user = await users_model.collection.findOne({
    username: username,
  });
  if (user) {
    return res.status(200).json(user);
  }
});

//update des données de user
app.put("/updateuser", async (req, res) => {
  if (
    vide(req.body.password) ||
    vide(req.body.email)
  ) {
    return res.status(404).json({ message: "vide" });
  } else {
    users_model
      .updateOne({ username: username }, req.body)
      .then(() => {
        console.log(username)
        return res.status(200).json({ message: "success" });
      })
      .catch(res.status(400));
  }
});


app.get("/createur", (req, res) => {
  res.send(username);
});

app.post("/signup", async (req, res) => {
  //le serveur vérifie si le champ id est unique et non vide
  if (
    vide(req.body.email) ||
    vide(req.body.username) ||
    vide(req.body.passeword)
  ) {
    return res.status(404).json({ message: "vide" });
  }
  //si ce n'est pas vide on vérifie si l'id existe ou pas
  else {
    const mail = await users_model.collection.findOne({ id: req.body.email });
    const user = await users_model.collection.findOne({
      id: req.body.username,
    });
    if (mail) {
      return res.status(404).json({ message: "Email déjà utilisé" });
    } else if (user) {
      return res.status(404).json({ message: "Username déjà utilisé" });
    } else {
      //on peut aussi utiliser la fonction create qui nous retourne l'element crée
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36)
      const user = {
        id: id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
      users_model.collection
        .insertOne(user)
        .then(() => {
          username = req.body.username;
          const token = jwt.sign({ id: req.body.email }, secret);
          return res.status(200).json({ token: token });
        })
        .catch(res.status(400));
    }
  }
});

/***********gestion des commentaires******/

//en cas de requete post d'un commentaire par un joueur
app.post("/commentaire", async (req, res) => {
  //le serveur vérifie si le champ commentaire n'est pas vide ainsi que
  // l'id de la balise et le username du joueur
  if (vide(req.body.commentaire) || vide(req.body.idbalise)) {
    return res.status(404).json({ message: "vide" });
  } else {
    model_commentaires
      .create(req.body)
      .then(() => {
        return res.status(200).json({ message: "success" });
      })
      .catch(res.status(400));
  }
});
//Pour la Récupération des différents commentaires de tous les joeurs
app.get("/comments", (req, res) => {
  model_commentaires
    .find({})
    .then((caches) => res.status(200).json(caches))
    .catch(res.status(400));
});

//Pour la Récupération des différents commentaires de tous les joeurs
app.get("/cachefound/:id", async(req, res) => {
  const cache = await model_commentaires.collection.findOne({ idbalise: req.params.id, username: username });
  let found = 0;
  if (cache) {
    found = 1;
  }
  return res.status(200).json(found);
});

module.exports = app;
