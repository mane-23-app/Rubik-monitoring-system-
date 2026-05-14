const Evento = require('../models/Evento');

// Obtener todos los eventos
exports.getEventos = async (req, res) => {
  try {
    // .sort({ createdAt: -1 }) los ordena del más nuevo al más viejo
    const eventos = await Evento.find().sort({ createdAt: -1 });
    res.status(200).json(eventos);
  } catch (error) {
    console.error("❌ Error en GET /eventos:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener eventos" });
  }
};

// Crear un nuevo evento
exports.crearEvento = async (req, res) => {
  try {
    console.log("📥 Evento recibido desde Arduino:", req.body); // LOG EN CONSOLA

    // 1. VALIDACIÓN: Campos obligatorios
    const { tipo_accion, grados_motor, cara_cubo, cantidad_movimientos, tiempo_armado_segundos } = req.body;
    
    if (!tipo_accion) {
      return res.status(400).json({ error: "El campo 'tipo_accion' es obligatorio." });
    }

    // 2. CREACIÓN
    const nuevoEvento = new Evento({
      tipo_accion,
      grados_motor,
      cara_cubo,
      cantidad_movimientos,
      tiempo_armado_segundos
    });

    const eventoGuardado = await nuevoEvento.save();
    
    // 3. RESPUESTA EXITOSA (201)
    res.status(201).json({
      mensaje: "Evento registrado exitosamente",
      data: eventoGuardado
    });

  } catch (error) {
    // RESPUESTA DE ERROR DEL SERVIDOR (500)
    console.error("❌ Error al guardar en MongoDB:", error.message);
    res.status(500).json({ error: "No se pudo guardar el evento en la base de datos", detalle: error.message });
  }
};