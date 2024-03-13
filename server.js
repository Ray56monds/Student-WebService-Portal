import express from 'express';
import morgan from 'morgan';
import path from 'path';
import courseRoutes from './routes/courseRoutes.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/courses', courseRoutes);

// Route handlers for HTML pages
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Service Portal!');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/node-course', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'node-course.html'));
});

app.get('/course', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'course.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
