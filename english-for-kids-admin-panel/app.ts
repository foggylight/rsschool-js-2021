import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import categoryRouter from './routes/category.route';
import cardRouter from './routes/card.route';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', categoryRouter);
app.use('/api', cardRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}!`));