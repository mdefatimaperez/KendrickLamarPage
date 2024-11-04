const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//CREAR USUARIO
router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña } = req.body;

    // Verificar si el email ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email ya está en uso.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear nuevo usuario
    const newUser = new User({ nombre, apellido, email, contraseña: hashedPassword });
    await newUser.save();

    // Generar token JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN , { expiresIn: '1h' });
    res.cookie("token",token) //quiero que almacenes en el front un objeto que el nombre de su propierdad sea token y su valor es el token generado

    // Enviar respuesta exitosa con el token
    res.status(201).json({ message: 'Usuario registrado exitosamente,se te redigira al login', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario.' });
  }
});




module.exports = router;