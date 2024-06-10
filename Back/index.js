'use strict'

require('dotenv').config()
const mongoConfig = require('./config/mongo')
const app = require('./config/app')
const adminController = require('./src/admins/admin.controller')

//crear admin por defecto al ejecutar el server
adminController.createAdminDefault()
mongoConfig.connect();
app.initServer();