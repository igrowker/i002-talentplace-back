# Etapa 1: Instalación de dependencias de desarrollo
FROM node:18-alpine3.15 AS build

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias de producción y desarrollo
COPY package*.json ./
RUN apk add --no-cache libc6-compat
RUN npm install --production=false

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: Producción del servidor
FROM node:18-alpine3.15 AS production

# Establecer directorio de trabajo para la aplicación en producción
WORKDIR /usr/src/app

# Copiar archivos de configuración de dependencias
COPY package*.json ./

# Copiar la aplicación construida desde la etapa anterior
COPY --from=build /app/dist ./dist

# Instalar solo las dependencias de producción
RUN npm install --production

# Comando para ejecutar la aplicación en producción
CMD [ "node", "./dist/index.js" ]