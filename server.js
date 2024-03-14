import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { getLoginPage, getNodeCoursePage, handleLogin } from './controllers/courseController.js';
import courseRoutes from './routes/courseRoutes.js';

// Directory to path
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Serve static files from the public directory
const publicPath = path.join(__dirname, 'Public');
app.use(express.static(publicPath));

// Routes
app.use('/api/courses', courseRoutes);

// Route for the login page
app.get('/login', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'login.html'));
});

// Route for handling login submission
app.post('/login', handleLogin);

// Route for the Node Course page
app.get('/node-course', getNodeCoursePage);

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Service Portal!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
