// server.js

import express from "express";
import morgan from  "morgan";
import courseRoutes from './routes/courseRoutes.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/courses', courseRoutes);

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));