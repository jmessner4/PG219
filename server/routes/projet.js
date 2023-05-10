const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require('bcryptjs');
const { Server } = require("socket.io");

const jwt = require("jsonwebtoken")

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
const io = new Server(3001);

const session = require('express-session');
var fs = require('fs');
const mongoose = require('mongoose');
let users = require('./users.js');
let chats=require('./chat.js');
let { db } = require("./users.js");
const { response } = require("express");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }); //setting the default folder for multer
mongoose.connect('mongodb+srv://eirbmon:eirbmon@cluster0.9jyvc.mongodb.net/tindeirb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
  db.collection('users').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
  });
  db.collection('chats').findOne({},function (findErr, result){
    if (findErr) throw findErr;
  });
});

const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        cb(null,fill.originalname)
    }
});


app.post('/uploadImage', upload.single('fileData'), async (req,res)=>{
    console.log('Uploading the image in the database ...')
    console.log(req.file);
    fs.readFile(req.file.path,(err, contents)=> {
        if (err) {
        console.log('Error: ', err);
       }else{
        console.log('File contents ',contents);
       }
      });
    const collection = db.collection('users');
    /*const user= collection.findOneAndUpdate({user_name : req.queryusername},{$set:{user_img:{
        data:req.body.img_url,
        contentType: 'image',
    }}}); */
});

const config = {
    //store: new SQLiteStore,
    secret: 'secret key',
    resave: true,
    rolling: true,
    cookie: {
      maxAge: 1000 * 3600//ms
    },
    saveUninitialized: true
  }
  
if (app.get('env') === 'production') {
app.set('trust proxy', 1) // trust first proxy
sess.cookie.secure = true // serve secure cookies
}
app.use(session(config))

//Fonction d'appel à la database 

const createUser = async object => {
    const collection = db.collection('users');
    const test= await users.findOne({user_name:object.user_name});
    if (test != null){
        console.log("Il y a déja un utilisateur avec ce pseudo:")
        console.log(test)
        return test
    }
    await collection.insertOne(object);
    const user= await users.findOne({user_name:object.user_name});
    return user
  }
  

const findUsers = async user_name => {
    const userss = await users.find({})
    userss.map(users => users.user_name);
    return userss
}

const findUser= async username =>{
    const user = await users.findOne({user_name: username});
    return user;
}


app.get("/", (req, res) => {
    res.send("Hello From The Server");
})


function validateUsername(username) {
    let errors = [];
    if (username.length == 0) {
        errors.push("Username Is Null");
    }

    if (username.length > 50) {
        errors.push("Username Length Can Not Exceed 50 Characters.");
    }

    return errors;
}

function validatePasswordconfirm(password,passwordconfirm) {
    let errors = [];
    if (password !== passwordconfirm || passwordconfirm === "") {
        errors.push("password confirmation is different from password");
    }

    return errors;
}

function validatePassword(password) {
    let errors = [];

    // check whether contact no is empty or not
    if (password.length == 0) {
        errors.push("Password Is Null");
    }

    return errors;
}

function validateEmail(email) {
    let errors = [];

    // checks whether email is empty or not
    if (email.length == 0) {
        errors.push("Email Is Null");
    }

    // checks whether email length is more then 100 or not
    if (email.length > 100) {
        errors.push("Email Can not exceed 100 Character");
    }


    // checks whether email is valid or not usinf regular expression
    if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email))) {
        errors.push("Email Is Not Valid");
    }

    return errors;
}

async function validateRegister(username,email){   
    let errors = [];
    const users = await findUsers()
    //On parcourt les pseudos et les emails pour voir si ils sont déjà pris
    let test = false
    for (let i = 0; i<users.length; i++){
        if (users[i].user_mail ===email) {
            test = true
        }
    }
    if (test){
        errors.push("The chosen email is already taken!"); 
    }
    test = false
    for (let i = 0; i<users.length; i++){
        if (users[i].user_name ===username) {
            test = true
        }
    }
    if (test){
        errors.push("The chosen username is already taken!");  
    }
    return errors;
}

async function ValidateUser_email(username_email){   
    let errors = [];
    const userss = await findUsers()
    let test = false;
    for (let i = 0; i<userss.length; i++){
        if (userss[i].user_mail ===username_email) {
            console.log(userss[i]);
            test = true
        }
    }
    for (let i = 0; i<userss.length; i++){
        if (userss[i].user_name ===username_email) {
            test = true
        }
    }
    if (!test){
            errors.push("There are no accounts linked to this email or username")
    }
    return errors;
}

async function ValidateMatchPassword(password,username_email){   
    let errors = [];
    test = false
    const good_user = await users.findOne({ $or: [ { user_mail: username_email } , { user_name: username_email } ] })
    if (good_user){
        if (bcrypt.compareSync(password, good_user.user_password)) {
        test = true
        }
        if (!test){
            errors.push("The password is wrong")
        }
        return errors;
    }
}

async function validateEdit(description,age,gender,likedsex){
    let errors = [""]
    if (description == ""){
        errors.push("Le champ description est vide")
    }
    if (age == ""){
        errors.push("Le champ age est vide")
    }
    if (parseInt(age) <= 17){
        errors.push("Vous êtes trop jeune")
    }
    if (gender == ""){
        errors.push("Le champ du genre est vide")
    }
    if (likedsex == ""){
        errors.push("Le champ de préférence est vide")
    }
    return errors
}

app.post("/signup", async(req, res) => {
    console.log("Sigining up...	");
    let username = req.body.username;
    let email = req.body.email;
    var salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password, salt);
    let passwordconfirm = bcrypt.hashSync(req.body.confirmpassword, salt);
    let age = req.body.age;

    let errFUsername = validateUsername(username); // will validate username
    let errEmail = validateEmail(email); // will validate email
    let errPassword = validatePassword(password); // will validate contact no
    let errPasswordconfirm = validatePasswordconfirm(password,passwordconfirm); // will validate passwordconfirm

    //On teste la database
    let errRegister = await validateRegister(username,email); //will validate final registration

    if (errFUsername.length || errEmail.length || errPassword.length || errPasswordconfirm.length || errRegister.length) {
        res.status(200).json({
            msg: "Validation Failed",
            errors: {
                username: errFUsername,
                email: errEmail,
                password: errPassword,
                passwordconfirm: errPasswordconfirm,
                register: errRegister
            }
        });
    }
    else {
        console.log("We add a new user to the database")
        console.log("We redirect to the home page")
        await createUser({ user_name: username, user_mail: email,user_password:password, user_islogged: true, user_age: age, user_profile_img:"../../assets/images/default.png"})
        const collection = db.collection('users');
        const tokens = await collection.findOne({user_name : username}); 
        const id = tokens._id;
        req.session.logged = true; 
        const token = jwt.sign({id},"jwtSecret", {
            expiresIn: 300,
        })
        res.status(200).json({
            msg: "User Registered Succesfully",
            auth:true,
            token:token,
            username:req.body.username,
        })
    }
});


app.get("/signup", async(req, res) => {
    const users = await findUsers()
    console.log(users[1]);
    res.status(200).send({
        msg: "All the data fetched successfully",
        data: users
    })
})

const verifyJWT = (req,res,next) =>{
    const token = req.get("x-access-token")

    if (!token){
        res.json({message:"No, we need a token, please give it to us next time", error:true})
    } 
    else{
        jwt.verify(token,"jwtSecret", (err,decoded)=>{
            if (err){
                res.json({auth:false, message:"You failed to authenticate", error:true})
            } else{
                req.userId = decoded.id;
                next();
            }
        });
    }
}

app.get('/isUserAuth', verifyJWT, (req,res)=> {
    res.json({
        message : "Yes, authentication is true",
        auth:true,
        error:false,
    })
})

app.post("/profileInfo", async(req, res) => {
    console.log("Fetching profile infos ...")
    let username = req.body.username
    const collection = db.collection('users');
    const user = await collection.findOne({user_name : username}); 
    res.status(200).json({
        data:user
    })
})*


// Connexion
app.post("/signin", async(req, res) => {
    console.log("Signing in...	");
    let username_email = req.body.username;
    let password = req.body.password;
    let errFUsername_email = await ValidateUser_email(username_email); // will check database to confirm username or email
    let errPassword = await ValidateMatchPassword(password,username_email); // will check the match in the database

    if (errFUsername_email.length ||  errPassword.length) {
        res.status(200).json({
            msg: "Validation Failed",
            errors: {
                username_email: errFUsername_email,
                password: errPassword,
            }
        });
    }
    else {
        console.log("We redirect to the home page")
        const collection = db.collection('users');
        req.session.logged = true; 
        
        await collection.findOneAndUpdate({user_name : username_email},{$set:{user_islogged:true}}); 
        const tokens = await collection.findOne({user_name : username_email}); 
        const id = tokens._id;
        console.log(id);
        const token = jwt.sign({id},"jwtSecret", {
            expiresIn: 300,
        })

        res.status(200).json({
            auth:true,
            token:token,
            username:req.body.username,
        })
    }
});

// Déconnexion
app.post("/signout", async(req, res) => {
    console.log("Signing out...	");
    const collection = db.collection('users');
    const users = await collection.findOneAndUpdate({user_name : req.body.username},{$set:{user_islogged:false}});
    res.status(200).send({
        msg: "Successfully signed out",
    })
})

app.post("/edit", async(req, res) => {
    console.log("Editing profile...	");
    let username = req.body.username._W
    let description = req.body.user_description
    let date = req.body.date
    let gender = req.body.gender
    let likedsex = req.body.likedsex
    let age = req.body.user_age

    let errors = validateEdit(description,age,gender,likedsex)
    console.log(errors)
    if (!errors[1]){
        const collection = db.collection('users');
        const users = await collection.findOneAndUpdate({user_name : username},{$set:{user_description:description,user_date:date,user_sexe:gender,user_likesexe:likedsex, user_age:age}});
    }
    res.status(200).send({
        msg: "Successfully changed the infos",
        errors: errors
    })
})

//Récuperation des infos publique d'users

async function getpublicinfo(tabuser){
    let size= tabuser.length;
    let tabinfo=[];
    let user;
    let infouser={
        name:"",
        description:"",
        profile_img:"",
    };
    for (let i=0; i< size; i++){
        user = await findUser(tabuser[i])
        infouser.name= user.user_name;
        infouser.description= user.user_description;
        infouser.profile_img= user.user_profile_img;
        tabinfo.push(Object.assign({},infouser));
    }
    return tabinfo;
}


/////////////Listen////////////////////////

app.listen(3000, () => {
    console.log("Server started ...");
});


////////////app.get et post/////////////////////

//get du profile
app.get("/profile/:user", async(req,res) =>{
    if (req.body.user != req.params.user){
        const tab = getpublicinfo(req.body.user)
        res.status(200).send({
            msg: "On envoie les info publique de l'user",
            data: tab
        })
    }
    else if (req.body.user != null){
        const user = await findUser(req.body.user);
        const mesinfos ={
            //remplir avel les infos nécessaire
        }
        res.status(200).send({
            msg: "On envoie les infos publiques et privées de l'user",
            data: mesinfos
        })
    }

})

//Mise a jour du profile de l'user: description, image et sexe des match désirés (true pour une femme, false pour un homme)
app.post("/profile/:user", async(req,res) =>{
    if (req.body.user == req.params.user){
        const user = await findUser(req.body.user);
        await users.updateOne({user_name: user.user_name},{$set: {user_description: req.body.description,user_profile_img: req.body.profile_img, user_likesex: req.body.likesex}},{upsert: true}); 
        res.status(200).send({
            msg: "Modification effectué",
        })
    }
    else{
        res.status(200).send({
            msg: "Vous n'avez pas les droit pour effectuer ces modifications",
        })
    }
})



