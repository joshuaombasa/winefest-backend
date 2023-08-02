const express = require('express')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
})


const router = express.Router()

const ordersCtrl = require('../controllers/ordersController')

router.post('/', ordersCtrl.addNewOrder)
 router.get('/', ordersCtrl.getAllOrders)
 router.delete('/:id', ordersCtrl.deleteOrder)

module.exports  =router