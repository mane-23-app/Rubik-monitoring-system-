const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' }); // Lee las variables
const connectDB = require('./config/db');
const eventoRoutes = require('./routes/eventoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la Base de Datos
connectDB();

// Registrar Rutas
app.use('/api', eventoRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});