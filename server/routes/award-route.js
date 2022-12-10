const AwardController = require('../controllers/AwardController')

const routes = require('express').Router()

routes.get("/", AwardController.getAwardPaginated)
routes.get("/all", AwardController.getAward)


module.exports = routes