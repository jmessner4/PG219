const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Création du modèle de la collection des caches
//id, longitude , latitude , 
const model_caches = new schema({

id:{
type :"number",
unique:true,
},
latitude:{
    type :"number"
},
longitude:{
    type :"number"
},
createur:{
   type:"string"
},
difficulte:{
    type : "string"
},
description:{
    type :"string"
}

})
module.exports = mongoose.model("cache",model_caches)
