import express from 'express';
import morgan from 'morgan';
import router from './routes/courseRoutes.js';
import { PrismaClient } from '@prisma/client';

const app = express();

// Create a PostgreSQL connection pool
const connectionString = `${process.env.DATABASE_URL}`;

// Initialize Prisma client with PostgreSQL adapter
const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Portal API');
});

app.use('/api/courses', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
