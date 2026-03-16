const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Tu lógica del servidor aquí, pero sin Socket.IO ya que no es soportado en serverless

app.get('/', (req, res) => {
  res.send('Hola desde Netlify Functions');
});

module.exports.handler = serverless(app);