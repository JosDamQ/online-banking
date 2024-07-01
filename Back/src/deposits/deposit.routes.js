'use stict'

const express = require('express')
const router = express.Router()
const depositController = require('./deposit.controller')

const { verifyToken } = require('../middlewares/loggedIn')
const { isAdmin } = require('../middlewares/isAdmin')

//
const { validateBody, validateParams, validateQuery } = require('../middlewares/AJV_validate/index')
const schemaCreateDeposit = require('../middlewares/AJV_validate/Deposit/CreateDeposit')
const schemaCancelDeposit = require('../middlewares/AJV_validate/Deposit/CancelDeposit')
const { schemaGetDepositsByAccountParam, schemaGetDepositsByAccountQuery } = require('../middlewares/AJV_validate/Deposit/GetDepositsByAccount')

//
router.post('/createDeposit', verifyToken, isAdmin, validateBody(schemaCreateDeposit), depositController.createDeposit)
router.delete('/cancelDeposit/:depositId', verifyToken, isAdmin, validateParams(schemaCancelDeposit), depositController.cancelDeposit)
router.get('/getDeposits', verifyToken, isAdmin, depositController.getDeposits)
router.get('/getDepositsByAccount/:accountId', verifyToken, isAdmin, validateParams(schemaGetDepositsByAccountParam), validateQuery(schemaGetDepositsByAccountQuery), depositController.getDepositsByAccount)
//
module.exports = router