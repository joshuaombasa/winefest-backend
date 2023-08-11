const JWT = require('jsonwebtoken')
const SECRET_KEY = `123ENU328F`

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')
   

    if(!token) {
        return res.status(400).json({message: "Please login first"})
    }

    try {
        const decoded = await JWT.verify(token, SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch(error) {
        return res.status(400).json({message: error})
    }
}