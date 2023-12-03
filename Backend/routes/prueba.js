const express = require('express');

const router = express.Router();

// Obtener todos los calzados deportivos
router.get('/', (req, res) => {
    res.send('Hola como estas?');
  });
  

module.exports = router;
