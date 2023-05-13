//const passwordHash = require("password-hash");
const url_db = 'mongodb://0.0.0.0:27017/geocachdb';
const mongoose = require('mongoose');
const users_model = require('../models/users');

const jwt = require("jsonwebtoken");
const secret = "JV5SHhjh_nnjnsj578snilq_nsjqk#dK";
const options = { expiresIn: "2d" };

async function signup(req, res) {
  const{email,username,password} = req.body;
  if (!email || !password || !username) {
    //Cas sans les champs remplis
    return res.status(400).json({
      text: "Requête invalide"
    });
  }

  //Vérification de la présence de l'utilisateur en base
  try {
    const findUser = await User.findOne({
      email
    });
    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà"
      });
    }

    const findUsername = await User.findOne({
      username
    });
    if (findUsername) {
      return res.status(400).json({
        text: "Nom d'utilisateur déjà pris"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }

  const token = jwt.sign(req.body, secret, options);

  users_model.collection.insertOne(req.body)
    .then(users=>res.status(200).json({users, token}))
    .catch(res.status('400'))  
  
}



async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  try {
    // On check si l'utilisateur existe en base
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res.status(401).json({
        text: "L'utilisateur n'existe pas"
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        text: "Mot de passe incorrect"
      });
    return res.status(200).json({
      token: findUser.getToken(),
      text: "Authentification réussie"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}