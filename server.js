const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const multer = require('multer')
// const { message } = require('statuses')
const app = express()

 const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
})

const storage = multer.diskStorage({
    destination : './wines/',
    filename : (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname) 
    }
})

const upload = multer({storage : storage})

app.use(cors())

app.use(express.json())

// app.use(express.urlencoded({extended: false}))

app.post('/wines', upload.single('wineImage'),(req, res) => {
    const { winePrice, wineName, wineDescription } = req.body
    const { filename } = req.file

    
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

app.get('/wines/:filename', (req,res) => {
    const { filename } = req.params
    res.sendFile(filename, {root : './wines/'})
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

app.post('/orders', (req, res) => {
   const { product_id, price, name,filename } = req.body

    const sql = `INSERT INTO orders (id, price, name, filename) VALUES (?, ?, ?, ?)`

    connection.query(
        sql,
        [product_id, price, name, filename],
        (error, results) => {
            if (error) {
                res.send(error)
            } else {
                res.send({message : `${name} added to cart successfully`})
            }
        }
    )
})

app.get('/orders', (req, res) => {
    const sql = `SELECT * FROM orders`

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

app.delete('/orders/:id', (req, res) => {
    const {id} = req.params

    const sql = `DELETE FROM orders WHERE id = ?`

    connection.query(
        sql,
        [parseInt(id)],
        (error, results) => {
            if (error) {
                console.log(error)
            } else {
                res.send(results)
            }
        }
    )
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})

