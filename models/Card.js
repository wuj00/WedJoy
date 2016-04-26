var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var User = require('./User.js')


var card_schema = new Schema({
    vendor: {type: String, required: true},
    location: String,
    website: String,
    price: String,
    _inspo: {type: ObjectId, ref: "Inspo", required: true}
})

// when creating a new product
card_schema.post('save', function(card){
// console.log(card)
var Inspo = require('./Inspo.js')
  Inspo.findById(card._inspo).exec(function(err, inspo){
    if (inspo.cards.indexOf(inspo._id) === -1){
      inspo.cards.push(inspo._id)
      inspo.save()
    }
  })
  // Inspo.findById(card._inspo).exec(function(err, inspo){
  //   //console.log(1, inspo)
  //   if (inspo.cards) {
  //
  //     if (inspo.cards.indexOf(card._id) === -1){
  //       inspo.cards.push(card._id)
  //       inspo.save()
  //     }
  //   }
  // })
})


// when deleting a card
card_schema.pre('findOneAndRemove', function(next){
    // console.log(100, this)
    this.findOne({}, function(err, card){
        // console.log(card)
        next()
    })

})
card_schema.post('findOneAndRemove', function(card){
  var Inspo = require('./Inspo.js')
  Inspo.findById(card._inspo).exec(function(err, inspo){
    if (inspo){
      inspo.cards.splice(inspo.cards.indexOf(card._id), 1)
      inspo.save()
    }
  })
  // Inspo.findById(card._inspo).exec(function(err, inspo){
  //   inspo.cards.splice(inspo.cards.indexOf(card._id), 1)
  //   inspo.save()
  // })
})


var Card = mongoose.model('Card', card_schema)
module.exports = Card
