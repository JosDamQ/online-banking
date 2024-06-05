'use strict'

const userController = require('./users.controller')
const express = require('express')
const router = express.Router()

//Rutas
router.get('/test', userController.test)

//
module.exports = router