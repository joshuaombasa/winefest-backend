const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    res.json({message : 'Login successful'})
})

module.exports = router