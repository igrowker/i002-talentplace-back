
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
    definition: {
        info: {
            title: 'Talent Place Igwroker',
            version: '1.0.0'
        },
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: "Ingresa el token con el prefijo 'Bearer: ', por ejemplo: 'Bearer abcde12345'."
            }
        }
    },
    apis: ["src/routes/users.router.ts", "src/routes/auth.router.ts", "src/routes/projects.router.ts", "src/routes/apps.router.ts"],
}


//Docs JSON format
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, _port) =>{
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (_req, res)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })
    console.log("Documentación de backend versión 1.0.0 ")
}

export default swaggerDocs;