'use strict'

const userController = require('./users.controller')
const express = require('express')
const router = express.Router()

const upload = require('../middlewares/uploadFiles')
const { verifyToken } = require('../middlewares/loggedIn')

//Rutas
router.get('/verifyEmail/:token', userController.verifyEmail)
router.patch('/editMyAccount',verifyToken, upload.single('image') , userController.editMyAccount)

//
module.exports = router