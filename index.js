// LLAMAR A EXPRESS (DEPENDENCIA)
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/index.js')
const albums = require('./models/album.js')
const users = require('./models/user.js')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config() //´process.env.DATABASE_URL 

const url = process.env.DATABASE_URL
const PORT = process.env.PORT
const app = express()
//EL ORGANIZADOR DE LA DATA
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); // vuelve la data un formato que se pueda comprender

//si alguien ingresa se lo manda a:
const path = require("path");
app.use(express.static(path.join(__dirname, "./public"))); 

//EL ORGANIZADOR DE LAS RUTAS
app.use('/', router)

const connectToMongo = async ()=>{
  try{
   await mongoose.connect(url)
   //FUNCION PARA LEVANTAR NUESTRO SERVIDOR
    app.listen(PORT, () => {
      console.log("Servidor escuchando en puerto 3000 y DB conectada");
    });

  }catch(error){
    //SI FALLA CAE ACA
    console.log(error)
  }  
}

connectToMongo()



