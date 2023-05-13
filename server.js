const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const ClientMongo = require('mongodb').MongoClient;
const url_db = 'mongodb://localhost:27017/geocachdb';
const mongoose = require('mongoose');
const caches_model = require('./models/caches');
const usersController = require('./server/usersController.js');
const users_model = require('./models/users');
const jwt = require("jsonwebtoken");

const secret = "JV5SHhjh_nnjnsj578snilq_nsjqk#dK";
const options = { expiresIn: "2d" };

app.listen(3000,() => {
console.log("serveur démarré avec succès")
})
app.use(bodyParser.json())
//connexion à la base de donnée
mongoose.connect(url_db)
.then(()=>console.log("connected to db"))
.catch(err=>console.log("error"))
//Création d'une fonction qui controle si la valeur d'un champ est vide
function vide(valeur){
    if ((valeur === null)||(typeof (valeur) === "string" && valeur.trim().length === 0) ||
    (typeof(valeur)=== "number" && valeur === 0)){
return true;
    }
else{
    return false;
}
}
// en cas de requete create
app.post('/create',async(req, res)=>{
//le serveur vérifie si le champ id est unique et  non vide
  if(vide(req.body.id)||vide(req.body.difficulte)
  ||vide(req.body.latitude)||vide(req.body.longitude)){
    return res.status(404).json({message: "vide"});
  } 
//si ce n'est pas vide on vérifie si l'id existe ou pas 
else{const cache = await caches_model.collection.findOne({id: req.body.id});
if(cache)
{return res.status(404).json({message: "cache existante"})}
else{
//on peut aussi utiliser la fonction create qui nous retourne l'element crée
caches_model.collection.insertOne(req.body)
.then(()=>{return res.status(200).json({message: "success"})})
.catch(res.status(400))
} }})
//en cas de requete de récupération
app.get('/caches',(req, res)=>{
     caches_model.find({})
    .then(caches=>res.status(200).json(caches))
    .catch(res.status(400))       
     })  
//update
app.put('/update/:id',async(req, res)=>{
    if(vide(req.body.difficulte)
    ||vide(req.body.latitude)||vide(req.body.longitude)||vide(req.body.description)){
      return res.status(404).json({message: "vide"});
    } else{
    caches_model.updateOne({id : req.params.id},req.body)
   .then(()=>{return res.status(200).json({message: "success"})})
   .catch(res.status(400))       
    }}) 
//delete
app.delete('/delete/:id',(req, res)=>{
    caches_model.deleteOne({id : req.params.id})
   .then(caches=>res.status(200).json(caches))
   .catch(res.status('400'))       
    })  

app.post('/login',async(req, res)=>{
    //le serveur vérifie si le champ id est unique et  non vide
  if(vide(req.body.email) || vide(req.body.passeword)){
    return res.status(404).json({message: "vide"});
  } 
    //si ce n'est pas vide on vérifie si l'id existe ou pas 
    else{
        const mail = await users_model.collection.findOne({id: req.body.email});
        if(mail)
        {
            const mpd = await users_model.collection.findOne({id: req.body.passeword});
            if(mdp) {
                const token = jwt.sign({id: req.body.email}, "secret");
                return res.status(200).json({token: token})
            }
        }  else {
            res.status(404).json({message: "Email ou mot de passe incorrect"});
        }
    }
})

app.post('/signup',async(req, res)=>{
    //le serveur vérifie si le champ id est unique et  non vide
  if(vide(req.body.email)||vide(req.body.username)
  ||vide(req.body.passeword)){
    return res.status(404).json({message: "vide"});
  } 
    //si ce n'est pas vide on vérifie si l'id existe ou pas 
    else{
        const mail = await users_model.collection.findOne({id: req.body.email});
        const user = await users_model.collection.findOne({id: req.body.username});
        if(mail)
        {
            return res.status(404).json({message: "Email déjà utilisé"})
        } else if(user){
            return res.status(404).json({message: "Username déjà utilisé"})
        } else {
            //on peut aussi utiliser la fonction create qui nous retourne l'element crée
            caches_model.collection.insertOne(req.body)
            .then(()=>{
                const token = jwt.sign({id: req.body.email}, "secret");
                return res.status(200).json({token: token})
            })
            .catch(res.status(400))
        }
    }
});

module.exports = app;
