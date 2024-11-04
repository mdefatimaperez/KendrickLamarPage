const express = require("express");
const router = express.Router();
const Album = require("../models/album");

// ALBUM

// Obtener todos los albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//obtener album por id
router.get('/:id', async (req, res) => {
  const albumId = req.params.id;
  try {
    const album = await Album.findById(albumId);
    if (!album) {

      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
});

// Agregar un album
router.post('/', async (req, res) => {
  const album = new Album(req.body);
  try {
    const newAlbum = await album.save();
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un álbum con una nueva canción
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      { $push: { canciones: req.body.canciones } },
      { new: true }
    );
    res.json(updatedAlbum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener las canciones de un álbum específico
router.get('/:id/songs', async (req, res) => {
  const albumId = req.params.id;
  try {
    const album = await Album.findById(albumId);
    if (!album) {

      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album.canciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//eliminar album
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar una canción de un álbum
router.delete('/:albumId/songs/:songId', async (req, res) => {
  try {
    const albumId = req.params.albumId;
    const songId = req.params.songId;

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    // Encuentra la canción en el array de canciones del álbum
    const songIndex = album.canciones.findIndex(song => song._id.toString() === songId);
    if (songIndex === -1) {
      return res.status(404).json({ message: 'Song not found' });
    }
    // Elimina la canción del array de canciones del álbum
    album.canciones = album.canciones.filter(song => song._id.toString() !== songId);

    // Guarda los cambios en la base de datos
    await album.save();

    return res.status(200).json({ message: 'Song deleted successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Error deleting song' });
  }
});

// Actualizar un álbum
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAlbum) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(updatedAlbum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
