import { Options, SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API',
        version: '1.0.0',
        description: 'This is a REST API application made with Express.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
        {
            url: process.env.SERVER_URL,
            description: 'Production server'
        }
    ],
};

export const swaggerApiOptions: Options = {
    swaggerDefinition,
    apis: ['./routes/*.ts'],
};