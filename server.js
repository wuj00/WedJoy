var express = require('express')
var app = express()
var mongoose = require('mongoose')
var morgan = require('morgan')
var path = require('path')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken') //used to create, sign, and verify tokens
var dotenv = require('dotenv').load({silent:true})

var userRoutes = require('./routes/users.js')
var inspoRoutes = require('./routes/inspos.js')
var cardRoutes = require('./routes/cards.js')
// var config = require('./config'); //get our config file

// console.log(process.env.SECRET);

//==================
// configuration ===============
//==================
mongoose.connect('mongodb://localhost/wedjoy', function(err){
    if(err) return console.log("Error connecting")
    console.log("Connected to MongoDB! Boom!")
})

//middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

//use morgan to log requests to the console
app.use(morgan('dev'))

//root route
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// app.get('/setup', function(req, res){
//   //create a sample User
//   var minion = new User({
//     name: 'Minion',
//     password: '1234',
//     admin: true
// });
//
// //save the sample User
//   minion.save(function(err){
//     if(err) throw err;
//
//     console.log("User saved successfully");
//     res.json({ success: true });
//   });
// });


app.use('/users', userRoutes)
app.use('/inspoboard', inspoRoutes)
app.use('/card', cardRoutes)


app.listen(3000, function(){
    console.log("Server running on localhost:3000!");
})
