var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var User = require('./User.js')
var Inspo = require('./Inspo.js')

var card_schema = Schema({
    vendorname: {type: String, required: true},
    location: String,
    website: String,
    price: String,
    inspo: {type: ObjectId, ref: "Inspo"},
})

// // when deleting a product
// product_schema.post('remove', function(product){
//   User.findById(product._creator).exec(function(err, user){
//     if (user){
//       user.products.splice(user.products.indexOf(product._id), 1)
//       user.save()
//     }
//   })
//   Category.findById(product.category).exec(function(err, category){
//     category.products.splice(category.products.indexOf(product._id), 1)
//     category.save()
//   })
// })


var Card = mongoose.model('Card', card_schema)
module.exports = Card
