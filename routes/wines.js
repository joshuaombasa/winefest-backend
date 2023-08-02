const express = require('express')
const multer = require('multer')
const mysql = require('mysql')

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

const router  =express.Router()

router.post('/', upload.single('wineImage'),(req, res) => {
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

router.get('/:filename', (req,res) => {
    const { filename } = req.params
    res.sendFile(filename, {root : './wines/'})
})

router.get('/', (req, res) => {
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

module.exports = router