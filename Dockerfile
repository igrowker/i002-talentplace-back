# Etapa 1: Instalación de dependencias
FROM node:alpine AS deps
#RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# Etapa 2: Construcción de la aplicación
FROM deps AS builder
COPY . .
RUN npm run build

# Etapa 3: Servidor de producción
FROM node:alpine AS runner
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --prod --ignore-scripts
COPY --from=builder /app .
CMD [ "npm", "start" ]