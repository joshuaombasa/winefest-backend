const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
})

exports.getAllWines = (req, res) => {
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
}

exports.getWineImage = (req,res) => {
    const { filename } = req.params
    res.sendFile(filename, {root : './wines/'})
}

exports.addNewWine = (req, res) => {
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
}

exports.deleteSingleWine = (req, res) => {

    const {id} = req.params

    const sql = 'DELETE FROM wine WHERE ID = ?'

    connection.query(
        sql,
        [parseInt(id)],
        (error, results) => {
            if (error) {
                res.json(error)
            } else {
                res.json({message: 'Wine deleted successfully!'})
            }
        }
    )
}