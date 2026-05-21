# Notas adicionales importantes

- El backend debe estar accesible desde la máquina donde abras el `Frontend.html`. Si usas Docker en otra máquina, coloca la IP de esa máquina en el campo de texto de la parte superior.
- El frontend no requiere instalación ni servidor: solo abre el archivo HTML en tu navegador.
- Toda la información mostrada (eventos, métricas, estado del cubo, etc.) depende de la respuesta del backend.
- Si no ves datos actualizados, intenta recargar el frontend o limpiar la caché del navegador.

### ¿Dónde se cambia la IP/servidor?

- El input para la IP del backend está en la línea **aprox. 280** de [`Frontend.html`](Frontend.html):
	```html
	<input type="text" id="serverIp" value="localhost" placeholder="IP del servidor" />
	```
- La lógica que usa ese valor está en la línea **aprox. 467**:
	```js
	const ip = document.getElementById('serverIp').value.trim() || 'localhost';
	return `http://${ip}:5000`;
	```
# Instrucciones para conectar el Frontend con el Backend usando Docker

1. **Levanta los servicios con Docker Compose**  
	Desde la raíz del proyecto, ejecuta:
	```bash
	docker-compose up --build
	```
	Esto iniciará el backend (Node.js) y la base de datos (MongoDB) en contenedores Docker.

2. **Verifica que el backend esté corriendo**  
	El backend debe estar disponible en:  
	```
	http://localhost:5000
	```
	Puedes probarlo accediendo a esa URL o usando herramientas como Postman/cURL.

3. **Abre el archivo Frontend.html**  
	- Ubicación: `frontend/Frontend.html`
	- Ábrelo en tu navegador (puedes hacer doble clic o usar un servidor local).

4. **Configura la IP del backend en el frontend**  
	- En la parte superior del Frontend, hay un campo de texto para la IP.
	- Por defecto, está en `localhost:5000`.  
	- Si corres el frontend en otra máquina o necesitas cambiar la IP, edítala ahí.

5. **El frontend se conecta automáticamente al backend**  
	- No necesitas modificar el HTML.
	- El frontend hace peticiones HTTP al backend usando la IP/puerto configurados.

---

### Referencias de líneas en el código

- La lógica para obtener la IP del backend está en la función `getBaseUrl()` en el archivo [`frontend/Frontend.html`](Frontend.html), alrededor de la línea donde aparece:
  ```js
  const ip = document.getElementById('serverIp').value.trim() || 'localhost';
  return `http://${ip}:5000`;
  ```
- El input para la IP está en la sección `<header>` del mismo archivo.
# Frontend Service

