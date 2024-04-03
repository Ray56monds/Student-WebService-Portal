import express from 'express';
import morgan from 'morgan';
import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js'; // Import user routes
import loginRouter from './routes/loginRoutes.js'; // Import login routes
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

// Create a PostgreSQL connection pool
const connectionString = `${process.env.DATABASE_URL}`;

// Initialize Prisma client with PostgreSQL adapter
const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/get-token', (req, res) => {
    // Generate JWT token with 15-minute expiration
    const token = jwt.sign({ email: req.body.email }, 'secretkey', { expiresIn: '15m' });
    res.status(200).json({ token });
});

/**
 * @swagger https://swagger.io/docs/specification/2-0/api-definition/#tags-object
 */
app.set('tag', 'Courses');

app.use('/api/v1', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/**
 * Mounting login routes
 */
app.use('/api/login', loginRouter);

/**
 * Mounting course routes
 */
app.use('/api/courses', courseRouter);

/**
 * Mounting user routes
 */
app.use('/api/users', userRouter);

// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Portal API');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
