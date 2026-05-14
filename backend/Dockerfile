FROM node:20-alpine

WORKDIR /app

# Copiar solo el package.json primero optimiza el caché de Docker
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Usamos npm start como buena práctica
CMD ["npm", "start"]