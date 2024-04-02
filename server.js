import express from 'express';
import morgan from 'morgan';
import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js'; // Import user routes
import { PrismaClient } from '@prisma/client';

const app = express();

// Create a PostgreSQL connection pool
const connectionString = `${process.env.DATABASE_URL}`;

// Initialize Prisma client with PostgreSQL adapter
const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(express.json());

// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Portal API');
});

// Mount course routes
app.use('/api/courses', courseRouter);

// Mount user routes
app.use('/api/users', userRouter);

// Create a new course
app.post('/api/courses', async (req, res) => {
    const { title, description, instructor, price, rating } = req.body;
    try {
        const newCourse = await prisma.course.create({
            data: {
                title: title,
                description: description,
                instructor: instructor,
                price: price,
                rating: rating
            }
        });
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Error creating course' });
    }
});

// Create a new user
app.post('/api/users', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                age: age
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
