const express = require('express')
const { check, validationResult} = require('express-validator')
const router = express.Router()
const loginCtrl = require('../controllers/loginController')

const mysql = require('mysql2/promise')
const JWT = require('jsonwebtoken')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
}

const SECRET_KEY = `123ENU328F`

router.post('/', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password greater than 7 characters").isLength({min: 8})
], async (req, res) => {
    const { email, password } = req.body
 
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }

    try {
        const connection = await mysql.createConnection(dbConfig)
        const getUserSql = `SELECT * FROM vendor WHERE email=?`
        const [rows] = await connection.query(getUserSql, [email])
        if (rows.length === 0) {
           return res.status(400).json({message: "User does not exists please sign up"})
        }

        const token = JWT.sign({userId : rows[0].id}, SECRET_KEY, {expiresIn : '1h'})
        return res.status(200).json({message: "Login Successful", token: token})

    } catch(error) {
        return res.status(400).json({error : [{"message" : error}]})
    }
})

module.exports = router