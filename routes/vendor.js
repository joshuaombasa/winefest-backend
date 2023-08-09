const express = require('express')
const router = express.Router()
const auth = require('../middleware/authLogic')
const { check, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
}

router.get('/', auth, (req, res) => {
    res.json({ message: "Welcome dear vendor" })
})

router.post('/', [
    check("email", "Please enter a valid password").isEmail(),
    check("password", "please enter a password greater than 7 characters").isLength({ min: 8 })
], async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() })
    }

    try {
        const connection = await mysql.createConnection(dbConfig)
        const getUserSql = `SELECT * FROM vendor WHERE email=?`
        const [rows] = await connection.query(getUserSql, [email])

        if (rows.length > 0) {
            connection.end()
            return res.status(400).json({ error: "User already exists" })
        }
        const saltRouds = 10
        const hashedPassword = await bcrypt.hash(password, 10)

        const createUserSql = `INSERT INTO vendor (first_name,  last_name, email, password) VALUES (?,?,?,?)`
        await connection.query(createUserSql, [firstname, lastname, email, hashedPassword])
        connection.end()

        res.status(200).json({message: `${firstname} ${lastname} added as a new vendor`})
    } catch (error) {
        res.status(200).json({ error: error })
    }

})

module.exports = router