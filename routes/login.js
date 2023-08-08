const express = require('express')
const { check, validationResult} = require('express-validator')
const router = express.Router()
const loginCtrl = require('../controllers/loginController')

router.post('/', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password greater than 7 characters").isLength({min: 8})
], loginCtrl.loginDealer)

module.exports = router