'use strict'

const adminController = require('./admin.controller')
const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/loggedIn')
const { isAdmin } = require('../middlewares/isAdmin')

//Rutas
router.post('/create-admin', verifyToken, isAdmin, adminController.createAdmin)
router.post('/create-user', verifyToken, isAdmin, adminController.createUser)

//
module.exports = router