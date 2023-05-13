const express = require('express')
const app = express();
const bodyParser = require('body-parser')
//const ClientMongo = require('mongodb').MongoClient;
const url_db = 'mongodb://0.0.0.0:27017/geocachdb';
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

// en cas de requete create
app.post('/create',(req, res)=>{
  //on peut aussi utiliser la fonction create qui nous retourne l'element crée
   caches_model.collection.insertOne(req.body)
   .then(cache=>res.status(200).json(cache))
   .catch(res.status(400))       
    })  
//en cas de requete de récupération
app.get('/caches',(req, res)=>{
     caches_model.find({})
    .then(caches=>res.status(200).json(caches))
    .catch(res.status(400))       
     })  
//update
app.put('/update/:id',(req, res)=>{
    caches_model.updateOne({id : req.params.id},req.body)
   .then(caches=>res.status(200).json(caches))
   .catch(res.status('400'))       
    })  
//delete
app.delete('/delete/:id',(req, res)=>{
    caches_model.deleteOne({id : req.params.id})
   .then(caches=>res.status(200).json(caches))
   .catch(res.status('400'))       
    })  
module.exports = app;
