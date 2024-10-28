const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//LOGEAR USUARIO
router.post('/', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Encuentra al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Genera token JWT
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN , { expiresIn: '1h' });
    res.cookie("token",token) //quiero que almacenes en el front un objeto que el nombre de su propierdad sea token y su valor es el token generado
    // Envía respuesta exitosa con el token
    res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
});

module.exports = router;