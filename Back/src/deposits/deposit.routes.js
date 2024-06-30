'use stict'

const express = require('express')
const router = express.Router()
const depositController = require('./deposit.controller')

const { verifyToken } = require('../middlewares/loggedIn')
const { isAdmin } = require('../middlewares/isAdmin')

//
const { validateBody, validateParams } = require('../middlewares/AJV_validate/index')
const schemaCreateDeposit = require('../middlewares/AJV_validate/Deposit/CreateDeposit')
const schemaCancelDeposit = require('../middlewares/AJV_validate/Deposit/CancelDeposit')

//
router.post('/createDeposit', verifyToken, isAdmin, validateBody(schemaCreateDeposit), depositController.createDeposit)
router.delete('/cancelDeposit/:depositId', verifyToken, isAdmin, validateParams(schemaCancelDeposit), depositController.cancelDeposit)

//
module.exports = router