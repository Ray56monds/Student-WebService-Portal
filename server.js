import express from 'express';
import morgan from 'morgan';
import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js';
import loginRouter from './routes/loginRoutes.js';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { generateToken, verifyTokenMiddleware } from './utils/jwt-auth.js';
import HttpStatus from 'http-status-codes';
import 'dotenv/config';

const app = express();

const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/login', loginRouter);
app.use('/api/courses', courseRouter);
app.use('/api/users', userRouter);

app.get('/get-token', (req, res) => {
    const token = generateToken({ email: req.body.email });
    res.status(HttpStatus.OK).json({ token });
});

// Use verifyTokenMiddleware as middleware for /verify-token route
app.get('/verify-token', verifyTokenMiddleware, (req, res) => {
    res.status(HttpStatus.OK).json({ message: 'Token is valid', decodedToken: req.decodedToken });
});

app.use('/api/v1', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(HttpStatus.OK).json({});
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Portal');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
