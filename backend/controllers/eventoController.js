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

// Crear un nuevo evento (Arquitectura de Telemetría y Monitoreo)
exports.crearEvento = async (req, res) => {
  try {
    // Actualizamos el log para reflejar que la petición viene de la App Web
    console.log("📥 Evento de telemetría recibido desde el Frontend:", req.body); 

    // 1. VALIDACIÓN: Mantenemos tu forma exacta de recibir los datos
    const { 
      tipo_evento, 
      detalles, 
      grados_motor, 
      cara_cubo, 
      cantidad_movimientos, 
      tiempo_armado_segundos 
    } = req.body;
    
    if (!tipo_evento) {
      return res.status(400).json({ error: "El campo 'tipo_evento' es obligatorio." });
    }

    // 2. CREACIÓN: Hacemos el puente (tipo_accion: tipo_evento) para Mongoose
    const nuevoEvento = new Evento({
      tipo_accion: tipo_evento, // <--- EL CAMBIO CLAVE PARA EVITAR EL ERROR 500
      fecha_hora: new Date(),
      detalles, 
      // Añadimos estos para que el historial en tu panel web tenga datos reales
      grados_motor,
      cara_cubo,
      cantidad_movimientos,
      tiempo_armado_segundos
    });

    const eventoGuardado = await nuevoEvento.save();
    
    // 3. RESPUESTA EXITOSA (201)
    res.status(201).json({
      mensaje: "Evento registrado exitosamente en MongoDB",
      data: eventoGuardado
    });

  } catch (error) {
    console.error("❌ Error al guardar en MongoDB:", error.message);
    res.status(500).json({ error: "No se pudo guardar el evento en la base de datos", detalle: error.message });
  }
};