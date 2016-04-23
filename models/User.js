var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var bcrypt = require('bcrypt-nodejs')

var user_schema = new Schema({
    name: String,
    lastname: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    inspo: [{type: Schema.ObjectId, ref: "Inspo"}],//each inspo id
    inspo_for: [{type: Schema.ObjectId, ref: "Inspo"}],//who received the inspo
    admin: Boolean
})

user_schema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

user_schema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

var User = mongoose.model('User', user_schema)
module.exports = User
