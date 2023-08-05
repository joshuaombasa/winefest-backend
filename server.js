const express = require('express')
const cors = require('cors')


const wineRoutes = require('./routes/wines')
const orderRoutes = require('./routes/orders')
const loginRoutes = require('./routes/login')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/login', loginRoutes)
app.use('/wines', wineRoutes)
app.use('/orders', orderRoutes)

app.listen(3000, () => {
    console.log('App listening on port 3000')
})

