const routes = require('express').Router()
// const authentification = require('../middlewares/authentification')
const userRoute = require("./user-route")
const awardRoute = require("./award-route")

routes.get("/", (req, res) => {
    res.status(200).json({ message: `Hello Masuk ke server` })
})

// routes.use(authentification)
routes.use("/login", userRoute)
routes.use("/awards", awardRoute)


module.exports = routes