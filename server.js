// server.js

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import courseRoutes from './routes/courseRoutes.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Routes
app.use('/api/courses', courseRoutes);

// Route for the login page
app.get('/login', courseController.getLoginPage);
app.post('/login', courseController.handleLogin);

// Route for other pages
app.get('/about', courseController.getAboutPage);
app.get('/node-course', courseController.getNodeCoursePage);

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Service Portal!');
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
