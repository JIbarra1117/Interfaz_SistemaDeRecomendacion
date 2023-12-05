const express = require('express');
const ProcesoScrapy = require('../models/procesoScrapyModel');

const router = express.Router();

// Ruta para obtener el último proceso
router.get('/ultimoProceso', async (req, res) => {
    try {
      // Consulta el último proceso ordenado por fecha de forma descendente (de más reciente a más antiguo)
      const ultimoProceso = await ProcesoScrapy.findOne().sort({ fecha: 'desc' });
  
      // Verifica si hay un proceso y responde con los datos
      if (ultimoProceso) {
        res.status(200).json(ultimoProceso);
      } else {
        res.status(404).json({ mensaje: 'No hay procesos almacenados' });
      }
    } catch (error) {
      console.error('Error al obtener el último proceso:', error);
      res.status(500).json({ mensaje: 'Error al obtener el último proceso' });
    }
  });

module.exports = router;
