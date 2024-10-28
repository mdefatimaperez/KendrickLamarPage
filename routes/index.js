const express = require('express')
const Album = require('../models/album.js')
const User = require('../models/user.js')

//UNA INSTANCIA PARA MANEJAR RUTAS
const router = express.Router()
//archivos con rutas
const albums = require('./album.js')
const users = require('./user.js')
const login = require('./login.js')
const signup = require('./signup.js')



//router.use 
router.use('/album', albums)
router.use('/user', users)
router.use('/login', login)
router.use('/signup',signup)


 module.exports = router