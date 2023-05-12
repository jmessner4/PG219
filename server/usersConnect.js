const account = require('./usersController.js');


const express = require("express")
const app = express()

// Express middleware to parse requests' body
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/geocachdb';

const accountChecker = (req, res, next) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
        id: Number,
        name:  String,
        birth_date: String,//YYYYMMDD
        //user_img:
        //{
        //    data: Buffer,
        //    contentType: String
        //},
        //user_profile_img: {type: String, default:"../../assets/images/default.png"},
        //user_description: {type: String, default:"générique"},
        islogged: {type: Boolean, default: false}
	}
	for (let attr in product) {
		if (product[attr] === undefined)
			return res.status(400).json({ error: "Bad product parameters." })
	}
	next()
}


MongoClient.connect(url)
	.then(client => client.db("geocachdb").collection("Users"))
	.then(user => {
        // Se connecter
        app.post('/login',usersController.login);
        app.post('/signup',usersController.signup);
        app.listen(3000, () => console.log("Awaiting requests."))
    })
    .catch(err => { throw err })

