import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import categoryRouter from './routes/category.route';
import cardRouter from './routes/card.route';
import authRouter from './routes/auth.router';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'English for kids API',
      description: 'API info',
      contacts: {
        name: 'Aleksandra Azarova',
      },
      servers: ['http://localhost:4000'],
      version: '1.0.0',
    },
  },
  apis: ['./routes/*'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

app.use('/api', categoryRouter);
app.use('/api', cardRouter);
app.use('/auth', authRouter);

app.listen(PORT);
