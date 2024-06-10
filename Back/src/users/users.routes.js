'use strict'

const userController = require('./users.controller')
const express = require('express')
const router = express.Router()

//Rutas
//router.get('/test', userController.test)
router.post('/register', userController.register)

//
module.exports = router