'use strict'

const adminController = require('./admin.controller')
const express = require('express')
const router = express.Router()

//Rutas
router.get('/test', adminController.test)

//
module.exports = router