
# Backend Service - Rubik Monitoring System 

Este es el microservicio Backend encargado de gestionar los logs de eventos del robot armador de cubos Rubik. Está desarrollado en **Node.js con Express** y se conecta a una base de datos **MongoDB**. Todo el entorno está contenerizado con **Docker** para facilitar su despliegue en la nube.

## 🚀 Cómo levantar el servicio (Para Rol 1 - Infraestructura)

Asegúrate de tener Docker y Docker Compose instalados. Desde la raíz del proyecto (donde está el archivo `docker-compose.yml`), ejecuta:

```bash
docker-compose up -d --build
📡 Documentación de la API (Endpoints)
La API expone las siguientes rutas bajo la URL base: http://<IP_DEL_SERVIDOR>:5000/api/eventos

1. Registrar un Evento (Para Rol 3 - Hardware/Arduino)
Método: POST

Ruta: /api/eventos

Descripción: Recibe los datos capturados por el ESP32/Arduino y los guarda en MongoDB.

Headers: Content-Type: application/json

Body esperado (JSON):

JSON
{
  "tipo_accion": "cubo_resuelto",
  "grados_motor": 90,
  "cara_cubo": "Frontal",
  "cantidad_movimientos": 42,
  "tiempo_armado_segundos": 15.5
}
(Nota para Arduino: Los campos numéricos y de texto deben ir exactamente con esos nombres. El campo timestamp lo genera el servidor de forma automática).

2. Consultar Eventos (Para Rol 4 - Frontend)
Método: GET

Ruta: /api/eventos

Descripción: Devuelve un arreglo (array) con todos los eventos registrados, ordenados desde el más reciente al más antiguo.

Respuesta exitosa (Ejemplo):

JSON
[
  {
    "_id": "6a0525c44f27d5d336c5fb32",
    "tipo_accion": "cubo_resuelto",
    "cantidad_movimientos": 42,
    "tiempo_armado_segundos": 15.5,
    "timestamp": "2026-05-14T01:30:44.903Z",
    "__v": 0
  }
]
🛠️ Pruebas Locales y Demostración (Para Rol 5 - QA)
Conexión en Red Local
Si están haciendo pruebas físicas en la misma red Wi-Fi o compartiendo internet desde un teléfono, el Arduino y el Frontend NO deben apuntar a localhost. Deben apuntar a la Dirección IPv4 de la computadora que está corriendo Docker.

En Windows: Abre CMD y escribe ipconfig. Busca la Dirección IPv4 (ej. 192.168.1.15).

URL a usar: http://192.168.1.15:5000/api/eventos

Comandos para la Demostración Final
Para cumplir con los requisitos de la presentación y demostrar la tolerancia a fallos, utiliza estos comandos desde la raíz del proyecto:

Apagar SOLO el backend (El robot no podrá registrar datos):

Bash
docker-compose stop backend
Encender el backend de nuevo:

Bash
docker-compose start backend
