const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' }); // Sube un nivel para leer el .env raíz

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite recibir JSON en los POST

// Conexión a MongoDB usando la variable del archivo .env
const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/rubikdb';
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a la base de datos del Robot Rubik'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Definir el esquema (molde) de los datos que enviará el robot
const eventoSchema = new mongoose.Schema({
  tipo_accion: { type: String, required: true },
  grados_motor: { type: Number, required: false },
  cara_cubo: { type: String, required: false },
  cantidad_movimientos: { type: Number, required: false },   
  tiempo_armado_segundos: { type: Number, required: false }, 
  timestamp: { type: Date, default: Date.now }
});

const Evento = mongoose.model('Evento', eventoSchema);

// Endpoint POST para recibir los eventos desde el Arduino
app.post('/api/eventos', async (req, res) => {
  try {
    const nuevoEvento = new Evento({
      tipo_accion: req.body.tipo_accion,
      grados_motor: req.body.grados_motor,
      cara_cubo: req.body.cara_cubo,
      cantidad_movimientos: req.body.cantidad_movimientos,     
      tiempo_armado_segundos: req.body.tiempo_armado_segundos  
    });

    const eventoGuardado = await nuevoEvento.save();
    res.status(201).json({ mensaje: 'Evento registrado con éxito', data: eventoGuardado });
  } catch (error) {
    console.error("Error real de MongoDB:", error);
    res.status(500).json({ 
      error: 'Error al registrar el evento', 
      detalle: error.message // <-- Esto nos mostrará el problema exacto en Thunder Client
    });
  }
});


// Endpoint GET para que el Frontend (Rol 4) pueda leer los eventos
app.get('/api/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find().sort({ timestamp: -1 }); // Muestra los más recientes primero
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
});

// Levantar el servidor en el puerto definido en el .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});