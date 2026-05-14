const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  tipo_accion: { 
    type: String, 
    required: [true, 'El tipo_accion es obligatorio'] // Validación a nivel de DB
  },
  grados_motor: { type: Number },
  cara_cubo: { type: String },
  cantidad_movimientos: { type: Number },
  tiempo_armado_segundos: { type: Number }
}, {
  timestamps: true, // Crea automáticamente createdAt y updatedAt
  versionKey: false // Quita el __v para que sea más limpio
});

module.exports = mongoose.model('Evento', eventoSchema);