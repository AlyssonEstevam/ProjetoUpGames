const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/routes/routes')
const app = express()
const port = 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

//inicia o servidor
app.listen(port,()=>{
    console.log('Running on port 4000')
})