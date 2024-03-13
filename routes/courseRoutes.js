// Import required modules
import express from 'express';
import * as courseController from '../controllers/courseController.js';
import { dirname, fileURLToPath } from 'url';
import { join } from 'path';

// Create router
const router = express.Router();

// Define routes for CRUD operations on courses
router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getAllCourses);
router.get('/courses/:courseId', courseController.getCourseById);
router.patch('/courses/:courseId', courseController.updateCourseById);
router.delete('/courses/:courseId', courseController.deleteCourseById);

// Export router
export default router;

// Function to get current directory name
const getCurrentDirname = () => {
    const filename = fileURLToPath(import.meta.url);
    return dirname(filename);
}

// Set the views directory
const viewsPath = join(getCurrentDirname(), '..', 'public');
app.set('views', viewsPath);
