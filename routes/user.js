const express = require('express');
const router = express.Router();
const User = require('../models/user');

// User Routes

// USER
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un usuario por ID (sin contraseña)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Editar un usuario
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id) //traemos el usuario
    user.favoritos.push({ //modificamos el valor del favorito
      titulo:"Maria , RM"
    })
    user.nombre="Esteban Quito"
    await user.save()

    // LINEA BONUS LO VEMOS EL VIERNES const user2 = await User.findById(userId).populate("favoritos");
   
   // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
   // if (!updatedUser) {
   //   return res.status(404).json({ error: 'Usuario no encontrado' });
   // }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/*  //obtener por nombre , mostrar el primero que aparezca
router.get('/nombre/:nombre', async (req, res) => {
  try {
    const user = await User.findOne({ nombre: req.params.nombre });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});  /*/



// Ruta para saber si el usuario existe o no 
router.get('/nombre/:nombre', async (req, res) => {
  const nombreBuscado = req.params.nombre;
  try {
    const usuariosEncontrados = await User.find({ nombre: nombreBuscado });
    res.json(usuariosEncontrados);
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ error: 'Error al buscar usuarios' });
  }
});



module.exports = router;

