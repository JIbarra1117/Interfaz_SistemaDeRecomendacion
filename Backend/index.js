const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
var cors = require("cors");
const http = require('http');
// const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3030;
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1/calzado_deportivo');

// //WebSocket
// wss.on('connection', (ws) => {
//   console.log('WebSocket connection established');

//   // Escucha mensajes del frontend
//   ws.on('message', (message) => {
//     console.log(`Received message from frontend: ${message}`);
//   });
// });

// Configurar middleware para analizar solicitudes JSON
app.use(express.json());
app.use(cors());
// Configurar las rutas
app.use('/', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
