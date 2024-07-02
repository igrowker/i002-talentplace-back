# Etapa 1: Instalación de dependencias de desarrollo y construcción
FROM node:alpine AS builder

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: Producción del servidor
FROM node:alpine AS runner

WORKDIR /usr/src/app

# Copiar solo los archivos necesarios para producción
COPY package.json package-lock.json ./

# Copiar la aplicación construida desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Instalar dependencias de producción
RUN npm ci --only=production

# Comando para ejecutar la aplicación en producción
CMD [ "npm", "start" ]
