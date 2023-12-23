// En tu archivo principal (por ejemplo, index.js o app.js)
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const procesoScrapyController = require('./routes/procesoScrapy');

const app = express();
const expressPort = process.env.PORT || 3031;
const expressServer = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1/calzado_deportivo');

// Configurar middleware para analizar solicitudes JSON
app.use(express.json());
app.use(cors({
  origin: '*',
}));

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', async (message) => {
    const messageData = JSON.parse(message);
    console.log('Mensaje recibido desde Python:', messageData);

    // Verifica el estado del mensaje
    if (messageData.estado === 'iniciado') {
      console.log('Proceso de Scrapy iniciado');
      // Realiza acciones específicas cuando el proceso de Scrapy inicia

      // Almacena el proceso de Scrapy en MongoDB
      try {
        await procesoScrapyController('Iniciado', true);
      } catch (error) {
        console.error('Error al almacenar el proceso iniciado en MongoDB:', error);
      }
    } else if (messageData.estado === 'completado') {
      console.log('Proceso de Scrapy terminado');
      // Realiza acciones específicas cuando el proceso de Scrapy termina
      // Almacena el proceso de Scrapy terminado en MongoDB
      try {
        await procesoScrapyController('Terminado', false);
      } catch (error) {
        console.error('Error al almacenar el proceso terminado en MongoDB:', error);
      }
    }
  });
});

// Manejar actualizaciones del servidor HTTP
expressServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
    console.log('Enviando mensaje a todos ')
  });
});

// Iniciar el servidor Express con WebSocket
expressServer.listen(expressPort, () => {
  console.log(`Servidor Express iniciado en http://localhost:${expressPort}`);
});

// Configurar rutas
app.use('/', routes);