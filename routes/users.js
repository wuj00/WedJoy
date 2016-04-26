var express = require('express')
var user_router = express.Router()
var user_ctrl = require('../controllers/userCtrl.js')

user_router.post('/authenticate', user_ctrl.authenticate)
user_router.route('/')
    .get(user_ctrl.index)
    .post(user_ctrl.create)

 user_router.use(user_ctrl.protect)
user_router.route('/:id')
    .get(user_ctrl.show)
    .patch(user_ctrl.update)
    .delete(user_ctrl.destroy)

module.exports = user_router
