const express = require('express')
const { signUp, getOne, getAll, updateUser } = require('../controller/userController')
const upload = require('../utils/multer.js')
const router = express.Router()

router.post('/sign-up', upload.single('image'), signUp)

router.get('/one/:id', getOne)

router.get('/all', getAll)

router.put('/update/:id', upload.single('image'), updateUser)

module.exports = router;