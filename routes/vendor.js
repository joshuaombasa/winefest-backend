const express = require('express')
const router = express.Router()
const auth = require('../middleware/authLogic')

router.get('/', auth, (req, res) => {
    res.json({message : "Welcome dear vendor"})
})

module.exports = router