// Import required modules
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import courseRoutes from './routes/courseRoutes.js';
import { getLoginPage, handleLogin, getAboutPage, getNodeCoursePage } from './controllers/courseController.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Set the views directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.set('views', path.join(__dirname, 'public'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/courses', courseRoutes);

// Route for the login page
app.get('/login', getLoginPage);
app.post('/login', handleLogin);

// Route for other pages
app.get('/about', getAboutPage);
app.get('/node-course', getNodeCoursePage);

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Service Portal!');
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
