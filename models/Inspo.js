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
    User.findById(inspo._creator).exec(function(err, creator){
        if(creator.inspo_for.indexOf(inspo._id) === -1){
            creator.inspo_for.push(inspo._id)
            creator.save()
        }
    })
    User.findById(inspo._inspoTo).exec(function(err, receiver){
        if(err) console.log(err)
        if(receiver.inspo.indexOf(inspo._id) === -1){
            receiver.inspo.push(inspo._id)
            receiver.save()
        }
    })
})

var Inspo = mongoose.model('Inspo', inspo_schema)
module.exports = Inspo
