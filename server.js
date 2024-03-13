// server.js

import express from 'express';
import morgan from 'morgan';
import courseRoutes from './routes/courseRoutes.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/courses', courseRoutes); // API routes for courses

app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Service Portal!');
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
