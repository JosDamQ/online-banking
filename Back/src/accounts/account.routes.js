'use strict'

const express = require('express')
const router = express.Router()

const accountController = require('./account.controller')

const { isAdmin } = require('../middlewares/isAdmin')
const { verifyToken } = require('../middlewares/loggedIn')
const { validateBody, validateParams, validateQuery } = require('../middlewares/AJV_validate/index')
//Schemas
const schemaCreateAccount = require('../middlewares/AJV_validate/Account/CreateAccount')
const schemaGetById = require('../middlewares/AJV_validate/Account/GetById')
const schemaGetByNumber = require('../middlewares/AJV_validate/Account/GetByNumber')
const schemaGetByUser = require('../middlewares/AJV_validate/Account/GetByUser')
const schemaGetByMovements = require('../middlewares/AJV_validate/Account/GetByMovements')

//Rutas
router.post('/create', verifyToken, isAdmin, validateBody(schemaCreateAccount), accountController.createAccount)
router.get('/getAll', verifyToken, isAdmin, accountController.getAccounts)
router.get('/get/:id', verifyToken, isAdmin, validateParams(schemaGetById), accountController.getAccount)
router.get('/getByNumber/:accountNumber', verifyToken, isAdmin, validateParams(schemaGetByNumber), accountController.searchAccountByNumber)
router.get('/getByUser/:id', verifyToken, isAdmin, validateParams(schemaGetByUser), accountController.getAccountsByUser)
router.get('/getByMovements', verifyToken, isAdmin, validateQuery(schemaGetByMovements), accountController.getByMovements)
router.delete('/delete/:id', verifyToken, isAdmin, validateParams(schemaGetById), accountController.deleteAccount)

module.exports = router
