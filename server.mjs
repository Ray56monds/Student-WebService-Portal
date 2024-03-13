// server.mjs

import express from "express";
import courseRoutes from './routes/courseRoutes.js';

const app = express();

// Middleware
app.use(morga('dev'));
app.use(express.json());

// Routes
app.use('/api/courses', courseRoutes);

// Server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));