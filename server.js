const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const wineRoutes = require('./routes/wines')
const orderRoutes = require('./routes/orders')
const app = express()

 const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
})



app.use(cors())

app.use(express.json())

// app.use(express.urlencoded({extended: false}))

app.use('/wines', wineRoutes)

app.use('/orders', orderRoutes)

app.listen(3000, () => {
    console.log('App listening on port 3000')
})

