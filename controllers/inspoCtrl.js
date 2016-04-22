var Inspo = require('../models/Inspo.js')

module.exports = {
    index: function(req, res){
        Inspo.find({}).exec(function(err, inspos){
            if(err) throw err
            res.json({success: true, message: "All inspirational boards", inspos: inspos})
        })
    },
    //show specific inspo
    show: function(req, res){
        Inspo.findById(req.params.id).exec(function(err, inspo){
            if(err) throw err
            res.json({success: true, inspo: inspo})
        })
    },
    destroy: function(req, res){
        Inspo.findOne({_id: req.params.id}).exec(function(err, inspo){
            if(err) throw err
            inspo.remove({_id: req.params.id}, function(err){
                if(err) throw err
                res.json({success: true, message: "inspirational board deleted"})
            })
        })
    }
}
