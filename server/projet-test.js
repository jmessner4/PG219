const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());

const session = require('express-session');


const url = 'mongodb://localhost:27017/PG219';


//Fonction d'appel à la database 
const createUser = async object => {
    const collection = db.collection('users');
    const user = await collection.insertOne(object);
    return user
}

const findUsers = async user_name => {
    const userss = await users.find({})
    userss.map(users => users.user_name);
    return userss
}

app.get("/", (req, res) => {
    res.send("Hello From The Server");
})