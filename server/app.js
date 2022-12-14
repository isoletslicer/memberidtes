if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}


const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./routes/route')
const app = express()
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())

//
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use(routes)

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})