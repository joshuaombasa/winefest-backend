const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const multer = require('multer')
const { message } = require('statuses')
const app = express()

 const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
})

const storage = multer.diskStorage({
    destination : './wines/',
    filename : (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname) 
    }
})

const upload = multer({storage : storage})

app.use(cors())

app.post('/wines', upload.single('wineImage'),(req, res) => {
    const { winePrice, wineName, wineDescription } = req.body
    const { filename } = req.file

    // console.log( winePrice)
    const sql = `INSERT INTO wine (price, name, description, filename) VALUES (?, ?, ?, ?)`
    
    connection.query(
             sql, 
             [winePrice, wineName, wineDescription, filename ],
             (error, results) => {
                if (error) {
                    res.send(error)
                } else {
                    res.send({message: 'Product saved successfully'})
                }
             }
        )
})

app.get('/wines', (req, res) => {
    const sql = `SELECT * FROM wine ORDER BY price`

    connection.query(
        sql,
        (error, results) => {
            if (error) {
                res.send(error)
            } else {
                res.send(results)
            }
        }
    )
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})

