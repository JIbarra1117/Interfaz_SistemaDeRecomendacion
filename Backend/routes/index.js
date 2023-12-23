const express = require('express');
const calzadoRoutes = require('./calzadoRoutes');
const procesoScrapyRouter = require('./dataProceso');
const recomendacion = require('./recomendacion');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bienvenido a la API de Calzado Deportivo');
});

router.use('/calzado_deportivo', calzadoRoutes);
router.use('/procesoScrapy', procesoScrapyRouter )
router.use('/recomendacion', recomendacion )

module.exports = router;
