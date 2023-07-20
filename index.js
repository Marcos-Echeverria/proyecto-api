const express = require('express');
const debug = require('debug')('app:main');

const {Config} = require('./src/config/index');
const {ProductsAPI} = require('./src/products/index');
const app = express();
const {UsersAPI} = require('./src/users');
const path = require('path');

//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Node MongoDB API",
            version: "1.0"
        },
        servers: [{
            url: "http://localhost:3000"
        }]
    },
    apis: [`${path.join(__dirname, "./src/products/index.js")}`],
};

//middlewares
app.use(express.json());
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

//modulos
ProductsAPI(app);
UsersAPI(app);

//server listening
app.listen(Config.port, () =>{
    debug(`Servidor escuchando en el puerto ${Config.port}`)
});