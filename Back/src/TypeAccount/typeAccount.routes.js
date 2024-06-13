'use strict'

const typeAccountController = require('./typeAccount.controller')
const express = require('express')
const router = express.Router()

const { verifyToken } = require('../middlewares/loggedIn')
const { isAdmin } = require('../middlewares/isAdmin')

const schemaCreateTypeAccount = require('../middlewares/AJV_validate/TypeAccount/CreateTypeAccount')
const schemaGetTypeAccount = require('../middlewares/AJV_validate/TypeAccount/GetTypeAccount')
const { validateBody, validateParams } = require('../middlewares/AJV_validate/index')

//Rutas
router.post('/create', verifyToken, isAdmin, validateBody(schemaCreateTypeAccount), typeAccountController.createTypeAccount)
router.get('/getAll', verifyToken, isAdmin, typeAccountController.getTypeAccounts)
router.get('/get/:id', verifyToken, isAdmin, validateParams(schemaGetTypeAccount), typeAccountController.getTypeAccount)

//
module.exports = router