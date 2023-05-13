const express = require('express')
const app = express();
const bodyParser = require('body-parser')
//const ClientMongo = require('mongodb').MongoClient;
const url_db = 'mongodb://localhost:27017/geocachdb';
const mongoose = require('mongoose')
const caches_model = require('./models/caches');

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
module.exports = app;
