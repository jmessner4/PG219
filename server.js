const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const url_db = "mongodb://localhost:27017/geocachdb";
const mongoose = require("mongoose");
const caches_model = require("./models/caches");
const model_commentaires = require("./models/commentaires");
const usersController = require("./server/usersController.js");
const users_model = require("./models/users");
const jwt = require("jsonwebtoken");

const secret = "JV5SHhjh_nnjnsj578snilq_nsjqk#dK";
const options = { expiresIn: "2d" };

app.listen(3000, () => {
  console.log("serveur démarré avec succès");
});
app.use(bodyParser.json());
//connexion à la base de donnée
mongoose
  .connect(url_db)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error"));

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
    console.log(mail);
    console.log(req.body.password);
    console.log(mail.password);
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
      users_model.collection
        .insertOne(req.body)
        .then(() => {
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

module.exports = app;
