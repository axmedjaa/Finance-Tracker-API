import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv'
dotenv.config()
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance Tracker API',
      version: '1.0.0',
      description: 'API documentation for our task manager backend'
    },
    servers: [
     {
        url: process.env.NODE_ENV=="development"?'https://finance-tracker-api-6c7f.onrender.com'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'] 
};

export const swaggerSpec = swaggerJSDoc(options);
