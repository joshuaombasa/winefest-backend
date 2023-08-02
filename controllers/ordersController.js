const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'winefest'
})

exports.getAllOrders = (req, res) => {
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
}

exports.addNewOrder = (req, res) => {
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
 }

 exports.deleteOrder = (req, res) => {
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
}