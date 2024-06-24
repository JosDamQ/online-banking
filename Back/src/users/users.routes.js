'use strict'

const userController = require('./users.controller')
const express = require('express')
const router = express.Router()

const upload = require('../middlewares/uploadFiles')
const { verifyToken } = require('../middlewares/loggedIn')

const { validateBody } = require('../middlewares/AJV_validate/index')
const schemaChangePassword = require('../middlewares/AJV_validate/User/ChangePassword')

//Rutas
router.get('/verifyEmail/:token', userController.verifyEmail)
router.patch('/editMyAccount',verifyToken, upload.single('image') , userController.editMyAccount)
router.patch('/editPassword',verifyToken, validateBody(schemaChangePassword), userController.updatePassword)

//
module.exports = router