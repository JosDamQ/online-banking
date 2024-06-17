'use strict'

const express = require('express')
const router = express.Router()

const accountController = require('./account.controller')

const { isAdmin } = require('../middlewares/isAdmin')
const { verifyToken } = require('../middlewares/loggedIn')

//Rutas
router.post('/create', verifyToken, isAdmin, accountController.createAccount)

module.exports = router
