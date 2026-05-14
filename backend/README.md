
# Backend Service - Rubik Monitoring System 

Este es el microservicio Backend encargado de gestionar los logs de eventos del robot armador de cubos Rubik. Está desarrollado en **Node.js con Express** y se conecta a una base de datos **MongoDB**. Todo el entorno está contenerizado con **Docker** para facilitar su despliegue en la nube.

##  Cómo levantar el servicio (Para Rol 1 - Infraestructura)

Asegúrate de tener Docker y Docker Compose instalados. Desde la raíz del proyecto (donde está el archivo `docker-compose.yml`), ejecuta:

```bash
docker-compose up -d --build
```
---
###  Documentación de la API (Endpoints)
## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso en el Proyecto |
| :--- | :--- |
| **Node.js** | Entorno de ejecución para el Backend |
| **Express** | Framework para exponer la API REST |
| **MongoDB** | Persistencia de datos NoSQL |
| **Mongoose**| ODM para modelado y validación de esquemas |
| **Docker** | Contenerización del servicio |
---
La API expone las siguientes rutas bajo la URL base:

```text
http://<IP_DEL_SERVIDOR>:5000/api/eventos
```

---

### 1. Registrar un Evento (Para Rol 3 - Hardware/Arduino)

- **Método:** `POST`
- **Ruta:** `/api/eventos`

#### Descripción

Recibe los datos capturados por el ESP32/Arduino y los guarda en MongoDB.

#### Headers

```http
Content-Type: application/json
```

#### Body esperado (JSON)

```json
{
  "tipo_accion": "cubo_resuelto",
  "grados_motor": 90,
  "cara_cubo": "Frontal",
  "cantidad_movimientos": 42,
  "tiempo_armado_segundos": 15.5
}
```

> **Nota para Arduino:**  
> Los campos numéricos y de texto deben enviarse exactamente con esos nombres.  
> El campo `timestamp` es generado automáticamente por el servidor.

---

### 2. Consultar Eventos (Para Rol 4 - Frontend)

- **Método:** `GET`
- **Ruta:** `/api/eventos`

#### Descripción

Devuelve un arreglo (`array`) con todos los eventos registrados, ordenados desde el más reciente hasta el más antiguo.

#### Respuesta exitosa (Ejemplo)

```json
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
```

---

#  Pruebas Locales y Demostración (Para Rol 5 - QA)

##  Conexión en Red Local

Si están haciendo pruebas físicas en la misma red Wi-Fi o compartiendo internet desde un teléfono, el Arduino y el Frontend **NO deben apuntar a `localhost`**.

Deben apuntar a la **Dirección IPv4** de la computadora que está ejecutando Docker.

### Obtener IP en Windows

Abre CMD y ejecuta:

```bash
ipconfig
```

Busca la sección:

```text
Dirección IPv4
```

Ejemplo:

```text
192.168.1.15
```

### URL a utilizar

```text
http://192.168.1.15:5000/api/eventos
```

---

#  Comandos para la Demostración Final

Para cumplir con los requisitos de la presentación y demostrar tolerancia a fallos:

---

##  Apagar SOLO el backend

> El robot no podrá registrar datos.

```bash
docker-compose stop backend
```

---

##  Encender nuevamente el backend

```bash
docker-compose start backend
```

---
  
