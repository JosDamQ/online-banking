'use stict'

const express = require('express')
const router = express.Router()
const depositController = require('./deposit.controller')

const { verifyToken } = require('../middlewares/loggedIn')
const { isAdmin } = require('../middlewares/isAdmin')

//
const { validateBody } = require('../middlewares/AJV_validate/index')
const schemaCreateDeposit = require('../middlewares/AJV_validate/Deposit/CreateDeposit')

//
router.post('/createDeposit', verifyToken, isAdmin, validateBody(schemaCreateDeposit), depositController.createDeposit)

//
module.exports = router