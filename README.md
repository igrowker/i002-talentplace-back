# Talent Place Backend API🚀

## Descripción 📄

Breve descripción de tu proyecto y sus funcionalidades principales.

## Tecnologías Utilizadas 🛠️

- TypeScript
- Node.js
- TypeORM
- PostgreSQL
- Express.js

## Instalación 💻

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

1. **Clona el repositorio**

   ```sh
   git clone https://github.com/igrowker/i002-talentplace-back.git
   cd i002-talentplace-back
   ```

2. **Instala las dependencias**

   ```sh
   npm install
   ```

3. **Configura las variables de entorno**
Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:

PORT=3000
DB_HOST=localhost
DB_USERNAME=
DB_PASSWORD=
DB_NAME_DATABASE=
JWT_SECRET=

4. **Compila el proyecto**

   ```sh
   npm run build
   ```

5. **Inicia el servidor en modo desarrollo**

   ```sh
   npm start
   ```

## Estructura del Proyecto 🛠️

El proyecto sigue una estructura de carpetas organizada para mantener el código modular y fácil de gestionar.

```plaintext
i002-talentplace-back/
├── .github/            # Configuración y flujos de trabajo de GitHub
├── @types/             # Declaraciones de tipos TypeScript
├── node_modules/       # Módulos de Node.js
├── src/                # Código fuente
│   ├── config/         # Configuración de la aplicación
│   ├── controllers/    # Controladores de la API
│   ├── doc/            # Documentación del proyecto
│   ├── dto/            # Objetos de transferencia de datos
│   ├── entities/       # Entidades de TypeORM
│   ├── helpers/        # Funciones de ayuda
│   ├── interfaces/     # Interfaces TypeScript
│   ├── middlewares/    # Middlewares de Express
│   ├── routes/         # Definición de rutas
│   ├── services/       # Lógica de negocio y servicios
│   ├── utils/          # Utilidades y funciones auxiliares
│   ├── index.ts        # Punto de entrada de la aplicación
│   └── server.ts       # Configuración del servidor
├── .dockerignore       # Ignorar archivos en Docker
├── .env                # Variables de entorno
├── .envDEFAULT         # Archivo de ejemplo para variables de entorno
├── .gitignore          # Ignorar archivos en Git
├── Dockerfile          # Configuración de Docker
├── nodemon.json        # Configuración de Nodemon
├── package-lock.json   # Bloqueo de versiones de paquetes
├── package.json        # Dependencias y scripts de npm
├── README.md           # Documentación del proyecto
└── tsconfig.json       # Configuración de TypeScript
```

## Documentación y Pruebas de la API con Swagger

Para facilitar la documentación y las pruebas de la API, hemos integrado Swagger en nuestro proyecto. Swagger proporciona una interfaz de usuario interactiva que permite a los desarrolladores explorar y probar los diferentes endpoints de la API de manera sencilla.

### Rutas Disponibles para Swagger 🔌

1. **Interfaz Interactiva de Swagger**
   - **URL**: [http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)
   - **Descripción**: Esta ruta sirve la interfaz de usuario de Swagger UI, donde puedes ver todos los endpoints documentados, sus métodos, parámetros, y ejemplos de respuesta. Además, puedes realizar peticiones directamente desde esta interfaz para probar los diferentes endpoints de la API.

2. **Especificación JSON de Swagger**:
   - **URL**: [http://localhost:3000/api/v1/docs.json](http://localhost:3000/api/v1/docs.json)
   - **Descripción**: Esta ruta proporciona la especificación completa de la API en formato JSON. Es útil para integraciones automáticas y para generar clientes de API en diferentes lenguajes de programación.