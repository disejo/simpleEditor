# Editor de Código Colaborativo en Tiempo Real

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Este proyecto es un editor de código web colaborativo construido con Express.js y Socket.IO, diseñado para que múltiples estudiantes puedan conectarse y editar código HTML, CSS y JavaScript simultáneamente.

## Características

- Editores separados para HTML, CSS y JS usando CodeMirror
- Vista previa en vivo del código
- Sincronización en tiempo real entre múltiples usuarios conectados
- Interfaz responsiva con Tailwind CSS
- Funciones para insertar estructura HTML5, limpiar código y descargar proyectos

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/simpleEditor.git
   cd simpleEditor
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Ejecuta `npm start` para iniciar el servidor en el puerto 3000.

O usa `npm run dev` para desarrollo con nodemon.

Abre tu navegador en `http://localhost:3000` para acceder al editor.

## Estructura del Proyecto

- `server.js`: Servidor Express con Socket.IO
- `public/index.html`: Página principal del editor
- `public/styles.css`: Estilos personalizados
- `public/script.js`: Lógica del cliente con sincronización en tiempo real

## Tecnologías Utilizadas

- Express.js
- Socket.IO
- CodeMirror
- Tailwind CSS
- Lucide Icons

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.