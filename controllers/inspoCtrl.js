var Inspo = require('../models/Inspo.js')

module.exports = {
    index: function(req, res){
        Inspo.find({}).exec(function(err, inspos){
            if(err) throw err
            res.json({success: true, message: "All inspirational boards", inspos: inspos})
        })
    },
    //show specific inspo
    show_inspo: function(req, res){
        Inspo.findById(req.params.id).exec(function(err, inspo){
            if(err) throw err
            res.json({success: true, inspo: inspo})
        })
    },
    post_inspo: function(req, res){
        var new_inspo = new Inspo(req.body)
        new_inspo.save(function(err, category){
            if(err) throw err
            res.json({success: true, message: "Inspirational board successfully uploaded", inspo: inspo})
        })
    },
    update_inspo: function(req, res){
        Inspo.findOne({_id: req.params.id}).exec(function(err, inspo){
            if(err) throw err
            inspo.name = req.body.name
            inspo.cards = req.body.cards
            inspo.save(function(err, saved_inspo){
                if(err) throw err
                res.json({success: true, message: "successfully edited inspirational board", inspo: saved_inspo})
            })
        })
    },
    destroy_inspo: function(req, res){
        Inspo.findOne({_id: req.params.id}).exec(function(err, inspo){
            if(err) throw err
            inspo.remove({_id: req.params.id}, function(err){
                if(err) throw err
                res.json({success: true, message: "inspirational board deleted"})
            })
        })
    }
}
