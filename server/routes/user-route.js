const UserController = require('../controllers/UserController')

const routes = require('express').Router()


routes.post("/", UserController.signInMethod)

module.exports = routes