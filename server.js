const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
  console.log('Un estudiante se conectó:', socket.id);

  // Enviar el estado inicial del código a nuevos usuarios
  socket.emit('code-update', {
    html: contenidoInicial.html,
    css: contenidoInicial.css,
    js: contenidoInicial.js
  });

  // Escuchar cambios en el código
  socket.on('code-change', (data) => {
    // Actualizar el estado global
    contenidoInicial.html = data.html;
    contenidoInicial.css = data.css;
    contenidoInicial.js = data.js;

    // Emitir a todos los clientes conectados
    socket.broadcast.emit('code-update', data);
  });

  socket.on('disconnect', () => {
    console.log('Un estudiante se desconectó:', socket.id);
  });
});

// Estado inicial del código (compartido entre todos)
let contenidoInicial = {
  html: `<div class="tarjeta">\n  <h2>¡Hola, Mundo!</h2>\n  <p>Este es tu primer proyecto.</p>\n  <button id="mi-boton">Haz clic aquí</button>\n</div>`,
  css: `body {\n  font-family: Arial, sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n  background-color: #f0f4f8;\n}\n\n.tarjeta {\n  background: white;\n  padding: 20px 40px;\n  border-radius: 10px;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n  text-align: center;\n}\n\nbutton {\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 16px;\n  margin-top: 10px;\n}\n\nbutton:hover {\n  background-color: #2563eb;\n}`,
  js: `const boton = document.getElementById('mi-boton');\n\nboton.addEventListener('click', () => {\n  boton.textContent = '¡Hiciste clic!';\n  boton.style.backgroundColor = '#10b981';\n});`
};

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});