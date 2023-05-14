const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Création du modèle de la collection des caches
//id, longitude , latitude ,
const model_users = new schema({
  id: {
    type: "number",
    unique: true,
    default: () =>
      Math.random().toString(40).substring(2) + Date.now().toString(36),
  },
  email: {
    type: "string",
  },
  username: {
    type: "string",
  },
  password: {
    type: "string",
  },
});
module.exports = mongoose.model("users", model_users);
