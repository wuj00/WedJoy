var User = require('../models/User.js')
var jwt = require('jsonwebtoken')

module.exports = {
    index: function(req, res){
        User.find({}).exec(function(err, users){
            if(err) return console.log(err)
            res.json(users)
        })
    },
    //create new user
    create: function(req, res){
        // User.create(req.body, function(err, user){
        //     if(err) return console.log(err)
        //     res.json({success: true, message: "User created", user: user})
        // })
//---------WITH BCRPYT------------------
        var new_user = new User(req.body)
        new_user.password = new_user.generateHash(req.body.password)
        new_user.save(function(err, user){
            if(err) throw err
            var token = jwt.sign(user.toObject(), process.env.SECRET.toString(), {
                expiresIn:50000
            })
            res.json({message: "user created, here's a token", user: user, token: token})
        })
    },
    //show specific user
    show: function(req, res){
        User.findOne({_id:
        req.params.id}).populate('inspo').exec(function(err, user){
            if(err) console.log(err)
            res.json(user)
        })
    },
    update: function(req, res){
        User.findOneAndUpdate({_id: req.params.id}).exec(function(err, user){
            if(err) throw err
            user.name = req.body.name
            user.lastname = req.body.lastname
            user.email = req.body.email
            user.save(function(err, saved_user){
                if(err) throw err
                res.json(saved_user)
            })
            res.json(user)
        })
    },
    destroy: function(req, res){
        User.findOneAndRemove({_id: req.params.id}, function(err, user){
            if(err) throw err
            User.remove({_id: req.params.id}, function(err){
                if(err) throw err
                res.json({success: true, message: "deleted!", deletedPerson: user})
            })
        })
    },
    authenticate: function(req, res){
        User.findOne({email: req.body.email}).exec(function(err, user){
            if (err) throw err
            if (!user) return res.json({success: false, message: "No user found with that email"})
            console.log(!user.validPassword(req.body.password))
            if (user && !user.validPassword(req.body.password))
                return res.json({success: false, message: "Password is wrong"})
                console.log(process.env)
            var token = jwt.sign(user.toObject(), process.env.SECRET.toString(), {
                expriresIn:50000
            })
            console.log("Here is your token: " + token)
            res.json({success: true, message: "Correct password. Here's your token!", token: token, user: user})
        })
    },

    protect: function(req, res, next){

   var token = req.body.token || req.query.token || req.headers['x-access-token']
   console.log(1, token)
   if (token) {
     jwt.verify(token, process.env.SECRET, function(err, decoded){
       if (err) return res.json({success: false, message: "wrong token infomation"})
       req.decoded = decoded
       next()
     })
   } else {
     return res.status(403).json({
       success: false,
       message: "no token was provided"
     })
   }
 }
}//close
