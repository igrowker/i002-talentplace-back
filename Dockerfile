# Etapa 1: Instalación de dependencias
FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install
# Install dependencies
RUN npm ci --silent

# Check for outdated dependencies
RUN npm outdated

# Update dependencies
RUN npm update

# Etapa 2: Construcción de la aplicación
FROM deps AS builder
COPY . .
RUN npm run build

# Etapa 3: Servidor de producción
FROM node:alpine AS runner
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=builder /app .
CMD [ "npm", "start" ]
