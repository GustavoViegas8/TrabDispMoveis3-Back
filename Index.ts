require('dotenv').config()

const Routes = require("./src/Routes")
const express = require('express')

const App = express()

App.use(express.json())
App.use('/Images', express.static('public'))
App.use(Routes)

App.listen(process.env.API_PORT, ()=>{
    console.log(`Servidor em: http://localhost:${process.env.API_PORT}`)
})
