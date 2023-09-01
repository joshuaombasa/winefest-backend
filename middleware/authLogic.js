const express = require('express')
const JWT = require('jsonwebtoken')
const SECRET_KEY = `123ENU328F`

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        res.status(400).json({error: "Token is not availabe, please login"})
    }
    try {
        const decoded = await JWT.verify(token, SECRET_KEY)
        const userId = decoded.userId
        req.userId = userId
        next()
    } catch(error) {
        return  res.status(400).json({error: error})
    }
}
 
// const JWT = require('jsonwebtoken')
// const SECRET_KEY = `123ENU328F`

// module.exports = async (req, res, next) => {
//     const token = req.header('Authorization')
   

//     if(!token) {
//         return res.status(400).json({message: "Please login first"})
//     }

//     try {
//         const decoded = await JWT.verify(token, SECRET_KEY)
//         req.userId = decoded.userId
//         next()
//     } catch(error) {
//         return res.status(400).json({message: error})
//     }
// }