import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { getAboutPage, getLoginPage, getNodeCoursePage, handleLogin } from './controllers/courseController.js';
import courseRoutes from './routes/courseRoutes.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Set the views directory and view engine
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Serve static files from the public directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Routes
app.use('/api/courses', courseRoutes);

// Route for the login page
app.get('/login', getLoginPage);
app.post('/login', handleLogin);

// Route for the Node Course page
app.get('/node-course', getNodeCoursePage);

// Route for the about page
app.get('/about', getAboutPage);

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Service Portal!');
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
