db = db.getSiblingDB("db_rubikscube");

db.createCollection("RubiksCubelog");

db.RubiksCubelog.insertOne({
  tipo_accion: "cubo_resuelto",
  grados_motor: 90,
  cara_cubo: "Frontal",
  cantidad_movimientos: 42,
  tiempo_armado_segundos: 15.5
});