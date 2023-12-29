const express= require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT
require('./config/db')

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const todoRoute = require('./routes/todoroutes')
app.use('/todo',todoRoute)


app.listen(PORT,()=>{
    console.log(`server is connected on ${PORT}`)
})