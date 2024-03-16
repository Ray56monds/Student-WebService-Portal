import express from 'express';
import path from 'path';
import morgan from 'morgan';
import router from './routes/courseRoutes.js';
import { fileURLToPath } from "url";

const app = express();
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the login page
app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'public','login.html');
    res.sendfile(filePath);
});

app.post('/login', (req, res) => {
    const { password } = req.body;
    const hardcodedPassword = 'Password1234';
    try {
        console.log('password:', password);
        if (password === hardcodedPassword) {
            res.redirect('/node-course');
        } else {
            res.redirect('/login?error=1');
        }
    } catch (error) {
        console.error('Error handling login:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for the Node Course page
app.get('/node-course', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'node-course.html');
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
