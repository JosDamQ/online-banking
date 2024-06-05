'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3200

// aqui van a ir las importaciones de las rutas que vaya a tener
const userRoutes = require('../src/users/users.routes')

// configurar servidor http
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors())
app.use(helmet());
app.use(morgan('dev'));


// aqui van a ir las rutas que vaya a tener
app.use('/users', userRoutes)

// Levantar el server
exports.initServer = () => {
    app.listen(port)
    console.log(`Server is running in port ${port}`);
}
