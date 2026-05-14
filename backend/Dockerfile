# Usar una imagen oficial de Node.js
FROM node:20-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código del backend
COPY . .

# Exponer el puerto (coincide con el .env y el docker-compose)
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]