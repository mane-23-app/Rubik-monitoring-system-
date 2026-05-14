
# Backend Service - Rubik Monitoring System 

Este es el microservicio Backend encargado de gestionar los logs de eventos del robot armador de cubos Rubik. Está desarrollado en **Node.js con Express** y se conecta a una base de datos **MongoDB**. Todo el entorno está contenerizado con **Docker** para facilitar su despliegue en la nube.

## 🚀 Cómo levantar el servicio (Para Rol 1 - Infraestructura)

Asegúrate de tener Docker y Docker Compose instalados. Desde la raíz del proyecto (donde está el archivo `docker-compose.yml`), ejecuta:

```bash
docker-compose up -d --build
