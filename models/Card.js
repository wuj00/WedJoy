var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var User = require('./User.js')
var Inspo = require('./Inspo.js')

var card_schema = new Schema({
    vendor: {type: String, required: true},
    location: String,
    website: String,
    price: String,
    _inspo: {type: ObjectId, ref: "Inspo"}
})

// when creating a new product
card_schema.post('save', function(card){
  Inspo.findById(card._inspo).exec(function(err, inspo){
    if (inspo.cards.indexOf(inspo._id) === -1){
      inspo.cards.push(inspo._id)
      inspo.save()
    }
  })
  Inspo.findById(card.Inspo).exec(function(err, inspo){
    if (inspo.cards) {
      if (inspo.cards.indexOf(card._id) === -1){
        inspo.cards.push(card._id)
        inspo.save()
      }
    }
  })
})


// when deleting a card
card_schema.post('remove', function(card){
  Inspo.findById(card._inspo).exec(function(err, inspo){
    if (inspo){
      inspo.cards.splice(inspo.cards.indexOf(card._id), 1)
      inspo.save()
    }
  })
  Inspo.findById(card.inspo).exec(function(err, inspo){
    inspo.cards.splice(inspo.cards.indexOf(card._id), 1)
    inspo.save()
  })
})


var Card = mongoose.model('Card', card_schema)
module.exports = Card
