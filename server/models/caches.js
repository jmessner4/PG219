const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Création du modèle de la collection des caches
//id, longitude , latitude ,
const model_caches = new schema({
  id: {
    type: "number",
    unique: true,
    required: true,
  },
  latitude: {
    type: "number",
    required: true,
  },
  longitude: {
    type: "number",
    required: true,
  },
  createur: {
    type: "string",
    default: "",
  },
  difficulte: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    default: "",
  },
});
module.exports = mongoose.model("cache", model_caches);
