const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

// Punto 7: Healthcheck
router.get('/health', (req, res) => {
  res.status(200).json({ status: "Backend activo", mensaje: "API funcionando correctamente" });
});

// Rutas de eventos
router.get('/eventos', eventoController.getEventos);
router.post('/eventos', eventoController.crearEvento);

module.exports = router;