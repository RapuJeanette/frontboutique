# Establece la imagen base
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Compila la aplicación de React
RUN npm run build

# Instala un servidor HTTP simple para servir el contenido estático
RUN npm install -g serve

ENV NODE_ENV production
# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Comando para ejecutar el servidor que servirá los archivos de compilación
CMD ["serve", "-s", "build"]
