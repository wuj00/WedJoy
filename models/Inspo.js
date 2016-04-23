var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var User = require('./User.js')
var Card = require('./Card.js')

var inspo_schema = new Schema({
    _creator: {type: Schema.ObjectId, ref: "User"},//current user
    _inspoTo: {type: Schema.ObjectId, ref: "User"},//other user
    name: String,
    cards: [{type: Schema.ObjectId, ref: "Card"}]
})

//creating a new inspoboard
inspo_schema.post('save', function(inspo){
    User.findById(inspo._creator).exec(function(err, user){
        if(user.inspo_for.indexOf(inspo._id) === -1){
            user.inspo_for.push(inspo._id)
            user.save()
        }
    })
    User.findById(inspo._inspoTo).exec(function(err, user){
        if(err) console.log(err)
        if(user.inspo.indexOf(inspo._id) === -1){
            user.inspo.push(inspo._id)
            user.save()
        }
    })
})

var Inspo = mongoose.model('Inspo', inspo_schema)
module.exports = Inspo
