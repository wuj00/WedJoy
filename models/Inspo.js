var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
// var User = require('./User.js')
// var Card = require('./Card.js')

var inspo_schema = new Schema({
    _creator: {type: ObjectId, ref: "User"},
    name: String,
    cards: [{type: ObjectId, ref: "Card"}]
})
//
// // //creating a new inspoboard
// // inspo_schema.post('save', function(inspo){
// //     User.findById(inspo._creator).exec(function(err, user){
// //         if(user.inspo.indexOf(inspo._id) === -1){
// //             user.inspo.push(inspo._id)
// //             user.save()
// //         }
// //     })
// // })
//
var Inspo = mongoose.model('Inspo', inspo_schema)
module.exports = Inspo
