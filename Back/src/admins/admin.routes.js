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
const schemaGetUserById = require('../middlewares/AJV_validate/Admin/GetUserById')
const schemaGetAdminById = require('../middlewares/AJV_validate/Admin/GetAdminById')
const schemaEditUser = require('../middlewares/AJV_validate/Admin/EditUser')

//Rutas
router.post('/create-admin', verifyToken, isAdmin, validateBody(schemaCreateAdmin), adminController.createAdmin)
router.post('/create-user', verifyToken, isAdmin, validateBody(schemaCreateUser), adminController.createUser)
router.get('/get-users', verifyToken, isAdmin, adminController.getUsers)
router.get('/get-user/:id', verifyToken, isAdmin, validateParams(schemaGetUserById), adminController.getUserById)
router.get('/get-admins', verifyToken, isAdmin, adminController.getAdmins)
router.get('/get-admin/:id', verifyToken, isAdmin, validateParams(schemaGetAdminById), adminController.getAdminById)
router.put('/update-user/:id', verifyToken, isAdmin, validateBody(schemaEditUser), adminController.updateUser)

//
module.exports = router