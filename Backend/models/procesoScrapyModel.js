const mongoose = require('mongoose');

const CalzadoDeportivo = mongoose.model('procesos', {
  estado: String,
  restultado: Boolean,
  fecha: Date,
});

module.exports = CalzadoDeportivo;
