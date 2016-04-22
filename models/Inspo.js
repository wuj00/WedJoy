var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var inspo_schema = Schema({
    _creator: {type: ObjectId, ref: "User"},
    cards: [{type: ObjectId, ref: "Card"}],
})

var Inspo = mongoose.model('Inspo', inspo_schema)
module.exports = Inspo
