const Evento = require('../models/Evento');

// Obtener todos los eventos
exports.getEventos = async (req, res) => {
  try {
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
    console.log("📥 Evento de telemetría recibido desde el Frontend:", req.body); 

    // Extraemos AMBAS posibles palabras por si el frontend cambia de nombre
    const { 
      tipo_evento, 
      tipo_accion, 
      detalles, 
      grados_motor, 
      cara_cubo, 
      cantidad_movimientos, 
      tiempo_armado_segundos 
    } = req.body;
    
    // TRUCO PRO: Usamos tipo_accion, pero si viene vacío, usamos tipo_evento
    const accionFinal = tipo_accion || tipo_evento;

    if (!accionFinal) {
      return res.status(400).json({ error: "El campo 'tipo_accion' o 'tipo_evento' es obligatorio." });
    }

    const nuevoEvento = new Evento({
      tipo_accion: accionFinal, // Guardamos la variable correcta
      fecha_hora: new Date(),
      detalles, 
      grados_motor,
      cara_cubo,
      cantidad_movimientos,
      tiempo_armado_segundos
    });

    const eventoGuardado = await nuevoEvento.save();
    
    res.status(201).json({
      mensaje: "Evento registrado exitosamente en MongoDB",
      data: eventoGuardado
    });

  } catch (error) {
    console.error("❌ Error al guardar en MongoDB:", error.message);
    res.status(500).json({ error: "No se pudo guardar el evento en la base de datos", detalle: error.message });
  }
};