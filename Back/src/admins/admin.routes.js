'use strict'

const adminController = require('./admin.controller')
const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/loggedIn')
const { isAdmin } = require('../middlewares/isAdmin')

// AJV
const { validateBody, validateParams, validateQuery } = require('../middlewares/AJV_validate/index')
const schemaCreateUser = require('../middlewares/AJV_validate/Admin/CreateUser')
const schemaCreateAdmin = require('../middlewares/AJV_validate/Admin/CreateAdmin')

//Rutas
router.post('/create-admin', verifyToken, isAdmin, validateBody(schemaCreateAdmin), adminController.createAdmin)
router.post('/create-user', verifyToken, isAdmin, validateBody(schemaCreateUser), adminController.createUser)

//
module.exports = router