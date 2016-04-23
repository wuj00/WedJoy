var Card = require('../models/Card.js')

module.exports = {

    //list all cards
    index: function(req, res){
        Card.find({}, function(err, cards){
            if(err) return console.log(err)
            res.json(cards)
        })
    },

    //create new card
    create: function(req, res){
        Card.create(req.body, function(err, card){
            if(err) return console.log(err)
            res.json({success: true, message: "Card created!", card: card})
        })
    },

    //show specific card
    show: function(req, res){
        Card.findOne({_id: req.params.id}, function(err, card){
            if(err) return console.log(err)
            res.json(card)
        })
    },
    //update a card
    update: function(req, res){
        Card.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, card){
            if(err) return console.log(err)
            res.json({success: true, message: "Card updated!", card: card})
        })
    },

    //delete a card
    delete: function(req, res){
        Card.findOneAndRemove({_id: req.params.id}, function(err){
            if(err) return console.log(err)
            res.json({success: true, message: "Card deleted!"})
        })
    }
} //last closing
