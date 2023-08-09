const bcrypt = require('bcrypt')
const { check, validationResult} = require('express-validator')
const mysql = require('mysql2/promise')
const JWT = require('jsonwebtoken')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
}

const SECRET_KEY = `123ENU328F`


module.exports = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    
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
}