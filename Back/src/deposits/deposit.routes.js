'use stict'

const express = require('express')
const router = express.Router()
const depositController = require('./deposit.controller')

const { verifyToken } = require('../middlewares/loggedIn')
const { isAdmin } = require('../middlewares/isAdmin')

//
router.post('/createDeposit', verifyToken, isAdmin, depositController.createDeposit)

//
module.exports = router