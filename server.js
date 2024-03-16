import express from 'express';
import path from 'path';
import morgan from 'morgan';
import router from './routes/courseRoutes.js';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the login page
app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'pages', 'login.html');
    res.sendfile(filePath);
});

// Route for the Node Course page
app.get('/node-course', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'pages', 'node-course.html');
    res.sendfile(filePath);
});

//Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Student Web Service Portal!');
});

// Route to the courses
// app.get('/api/courses', (req, res) => {
//     res.send('Welcome to the Student Web Service Portal!');
// })

app.use('/api/courses', router);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
