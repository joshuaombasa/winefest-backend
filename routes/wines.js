const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : './wines/',
    filename : (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname) 
    }
})

const upload = multer({storage : storage})

const router  =express.Router()

const winesCtrl = require('../controllers/winesController')



router.get('/:filename', winesCtrl.getWineImage)
router.post('/', upload.single('wineImage'), winesCtrl.addNewWine)
router.get('/', winesCtrl.getAllWines)
router.delete('/:id', winesCtrl.deleteSingleWine)

module.exports = router