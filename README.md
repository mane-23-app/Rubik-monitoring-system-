# Rubik Monitoring System

Sistema de monitoreo de eventos para un robot armador de cubos Rubik utilizando arquitectura basada en Docker, MongoDB, Backend API y Frontend Web.

---

# Descripción

Este proyecto permite registrar, almacenar y visualizar eventos generados por un robot armador de cubos Rubik.

El sistema está compuesto por:

- Frontend web
- Backend API REST
- Base de datos MongoDB
- Contenedores Docker
- Infraestructura Ubuntu Server

---

# Arquitectura del Sistema

```plaintext
Arduino Robot
      │
      ▼
Backend API
      │
      ▼
MongoDB
      │
      ▼
Frontend Dashboard
```

---

# Componentes del Sistema

## Frontend

Interfaz web encargada de visualizar los eventos registrados del robot en tiempo real.

### Tecnologías

- React
- JavaScript
- Docker

---

## Backend

API REST encargada de recibir, procesar y enviar información entre el frontend y la base de datos.

### Tecnologías

- Node.js
- Express.js
- Docker

---

## MongoDB

Base de datos NoSQL utilizada para almacenar los eventos generados por el robot.

### Tecnologías

- mongodb 4.4
- Docker

---

# Base de Datos

El sistema utiliza MongoDB como base de datos principal para almacenar:

- Eventos del robot
- Timestamps
- Acciones registradas
- Logs del sistema

MongoDB se ejecuta dentro de un contenedor Docker utilizando:

```plaintext
mongo:4.4
```

---

# Tecnologías Utilizadas

- Docker
- Docker Compose
- MongoDB
- Node.js
- React
- GitHub

---

# Estructura del Proyecto

```plaintext
Rubik-monitoring-system/
│
├── backend/
├── database/
├── docs/
├── frontend/
├── scripts/
├── docker-compose.yml
├── .env
└── README.md
```

---

# Instalación

## Clonar repositorio

```bash
git clone https://github.com/mane-23-app/Rubik-monitoring-system-.git
```

---

## Entrar al proyecto

```bash
cd Rubik-monitoring-system-
```

---

## Ejecutar contenedores

```bash
docker-compose up -d
```

---

# Verificar Servicios

```bash
docker ps
```

Debe aparecer:

- mongodb
- backend
- frontend

---

# Acceso al Sistema

## Frontend

```plaintext
http://157.230.54.54:3000
```

---

## Backend

```plaintext
http://157.230.54.54:5000/api/health
http://157.230.54.54:5000/api/eventos


```

---

# Puertos Utilizados

| Servicio | Puerto |
| Frontend | 3000 |
| Backend | 5000 |
| MongoDB | 27017 |

---

# Comandos Útiles

## Ver logs

```bash
docker logs backend
docker logs frontend
docker logs mongodb
```

---

## Detener servicios

```bash
docker-compose down
```

---

## Reiniciar servicios

```bash
docker-compose restart
```

---

# Deploy Cloud

El proyecto puede desplegarse en:

- DigitalOcean
---

# Estado del Proyecto

```plaintext
 Docker
 MongoDB
 Frontend
 Backend
 Cloud Ready
```

---

# Licencia

Proyecto académico y educativo.
