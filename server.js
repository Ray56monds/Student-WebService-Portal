// server.js

import express from 'express';
import morgan from 'morgan';
import courseRoutes from './routes/courseRoutes.js';
import pageRoutes from './routes/pageRoutes.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/courses', courseRoutes); // API routes for courses
app.use('/', pageRoutes); // Routes for rendering HTML pages

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
