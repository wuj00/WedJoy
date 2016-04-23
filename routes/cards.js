var express = require('express')
var card_router = express.Router()
var card_ctrl = require('../controllers/cardCtrl.js')

card_router.route('/')
    .get(card_ctrl.index)
    .post(card_ctrl.create)

card_router.route('/:id')
    .get(card_ctrl.show)
    .patch(card_ctrl.update)
    .delete(card_ctrl.delete)

module.exports = card_router
