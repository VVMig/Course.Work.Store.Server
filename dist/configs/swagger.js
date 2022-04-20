"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerApiOptions = void 0;
const swaggerDefinition = {
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
exports.swaggerApiOptions = {
    swaggerDefinition,
    apis: ['./routes/*.ts'],
};
//# sourceMappingURL=swagger.js.map