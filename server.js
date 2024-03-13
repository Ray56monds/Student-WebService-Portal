// server.js

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import courseRoutes from './routes/courseRoutes.js';

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/courses', courseRoutes);

// Route for the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Route for other pages
app.get('/courses', (req, res) => {
    res.render('courses');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/node-course', (req, res) => {
    res.render('node-course');
});

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Service Portal!');
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
