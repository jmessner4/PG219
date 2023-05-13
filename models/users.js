const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Création du modèle de la collection des caches
//id, longitude , latitude , 
const model_users = new schema({

id:{
type :"number",
unique:true,
},
email:{
    type :"string"
},
username:{
    type :"string"
},
password:{
   type:"string"
},

})
module.exports = mongoose.model("users",model_users)