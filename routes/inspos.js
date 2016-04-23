var express = require('express')
var inspo_router = express.Router()
var inspo_ctrl = require('../controllers/inspoCtrl.js')

inspo_router.route('/')
    .get(inspo_ctrl.index)
    .post(inspo_ctrl.post_inspo)

inspo_router.route('/:id')
    .get(inspo_ctrl.show_inspo)
    .patch(inspo_ctrl.update_inspo)
    .delete(inspo_ctrl.delete_inspo)


module.exports = inspo_router
