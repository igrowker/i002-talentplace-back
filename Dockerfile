# Etapa 1: Instalación de dependencias de desarrollo
FROM node:18-alpine3.15 AS deps

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias con npm (usando --frozen-lockfile para reproducibilidad)
RUN npm install --frozen-lockfile

# Instalar libc6-compat para compatibilidad con bibliotecas binarias
RUN apk add --no-cache libc6-compat

# Etapa 2: Construcción de la aplicación
FROM deps AS builder

# Establecer directorio de trabajo
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 3: Producción del servidor
FROM node:18-alpine3.15 AS runner

# Establecer directorio de trabajo para la aplicación en producción
WORKDIR /usr/src/app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Copiar la aplicación construida desde la etapa de construcción
COPY --from=builder /app ./

# Comando para ejecutar la aplicación en producción
CMD [ "npm", "start" ]