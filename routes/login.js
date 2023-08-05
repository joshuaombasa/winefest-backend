const express = require('express')
const router = express.Router()
const loginCtrl = require('../controllers/loginController')
router.post('/', loginCtrl.loginDealer)

module.exports = router