const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Création du modèle de la collection des caches
//id, longitude , latitude , 
const model_commentaires = new schema({

id:{
type :"number",
unique:true,
required:true,
},
idbalise:{
    type :"number",
    required:true,

},
username:{
    type :"string",
    required:true,

},
commentaire:{
   type:"string",
   default:'',
   
},


})
module.exports = mongoose.model("commentaires",model_commentaires)