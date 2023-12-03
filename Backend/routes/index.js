const express = require('express');
const calzadoRoutes = require('./calzadoRoutes');
const prueba = require('./prueba');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bienvenido a la API de Calzado Deportivo');
});

router.use('/calzado_deportivo', calzadoRoutes);
router.use('/prueba', prueba)

module.exports = router;
