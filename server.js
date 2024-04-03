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

// Generate JWT token with 15-minute expiration
app.get('/get-token', (req, res) => {
    const token = jwt.sign({ email: req.body.email }, 'secretkey', { expiresIn: '15m' });
    res.status(200).json({ token });
});

// Set CORS headers
app.use('/api/v1', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next(); // Call next middleware in chain
});

// Mount login routes
app.use('/api/login', loginRouter);

// Mount course routes
app.use('/api/courses', courseRouter);

// Mount user routes
app.use('/api/users', userRouter);

// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Portal');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
