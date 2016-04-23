var express = require('express')
var inspo_router = express.Router()
var inspo_ctrl = require('../controllers/inspoCtrl.js')

inspo_router.route('/')
    .get(inspo_ctrl.index)
    .post(inspo_ctrl.create)

inspo_router.route('/:id')
    .get(inspo_ctrl.show)
    .patch(inspo_ctrl.update)
    .delete(inspo_ctrl.delete)


module.exports = inspo_router
