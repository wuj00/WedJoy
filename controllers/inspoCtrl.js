// var Inspo = require('../models/Inspo.js')
//
// module.exports = {
//
//     //list all inspos
//     index: function(req, res){
//         Inspo.find({}, function(err, inspo){
//             if(err) return console.log(err)
//             res.json(inspos)
//         })
//     },
//
//     //create new inspo
//     create: function(req, res){
//         Inspo.create(req.body, function(err, inspo){
//             if(err) return console.log(err)
//             res.json({success: true, message: "Inspoboard created!", inspo: inspo})
//         })
//     },
//
//     //show specific inspo
//     show: function(req, res){
//         Inspo.findOne({_id: req.params.id}, function(err, inspo){
//             if(err) return console.log(err)
//             res.json(inspo)
//         })
//     },
//     //update a inspo
//     update: function(req, res){
//         Inspo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, inspo){
//             if(err) return console.log(err)
//             res.json({success: true, message: "Inspo updated!", inspo: inspo})
//         })
//     },
//
//     //delete a inspo
//     delete: function(req, res){
//         Inspo.findOneAndRemove({_id: req.params.id}, function(err){
//             if(err) return console.log(err)
//             res.json({success: true, message: "Inspo deleted!"})
//         })
//     }
// } //last closing



////---------------------------------------------------------------

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
        Inspo.findOne({_id: req.params.id}).populate('_creator').exec(function(err, inspo){
            if(err) throw err
            res.json(inspo)
        })
    },
    //create
    post_inspo: function(req, res){
        var new_inspo = new Inspo(req.body)
        new_inspo.save(function(err, inspo){
            if(err) throw err
            res.json({success: true, message: "Inspirational board successfully uploaded", inspo: inspo})
        })
    },
    //edit
    update_inspo: function(req, res){
        Inspo.findOneAndUpdate({_id: req.params.id}).exec(function(err, inspo){
            if(err) throw err
            inspo.name = req.body.name
            inspo.cards = req.body.cards
            inspo.save(function(err, saved_inspo){
                if(err) throw err
                res.json({success: true, message: "successfully edited inspirational board", inspo: saved_inspo})
            })
        })
    },
    delete_inspo: function(req, res){
        Inspo.findOneAndRemove({_id: req.params.id}).exec(function(err, inspo){
            if(err) throw err
            inspo.remove({_id: req.params.id}, function(err){
                if(err) throw err
                res.json({success: true, message: "inspirational board deleted"})
            })
        })
    }
}
