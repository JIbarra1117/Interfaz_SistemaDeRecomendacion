const mongoose = require('mongoose');

const CalzadoDeportivo = mongoose.model('calzados', {
  modelo: String,
  marca: String,
  precio: Number,
  color: String,
  url_raiz: String,
  url_calzado: String,
  descripcion: String,
  calificacion: Number,
  tallas: Array,
  imagenes: Array,
});

module.exports = CalzadoDeportivo;
