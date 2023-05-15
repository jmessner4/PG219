const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Création du modèle de la collection des commentaires
const model_commentaires = new schema({
  id: {
    type: "string",
    unique: true,
    default: () =>
      Math.random().toString(36).substring(2) + Date.now().toString(36),
  },
  idbalise: {
    type: "number",
    required: true,
  },
  username: {
    type: "string",
    default: "",
  },
  commentaire: {
    type: "string",
    required: true,
  },
});
module.exports = mongoose.model("commentaires", model_commentaires);
