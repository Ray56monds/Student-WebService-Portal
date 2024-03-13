// Import required modules
import express from 'express';
import * as courseController from '../controllers/courseController.js';

// Create router
const router = express.Router();

// Define routes for CRUD operations on courses
router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getAllCourses);
router.get('/courses/:courseId', courseController.getCourseById);
router.patch('/courses/:courseId', courseController.updateCourseById);
router.delete('/courses/:courseId', courseController.deleteCourseById);

// Define routes for rendering HTML pages
router.get('/courses', pageController.getCoursesPage);
router.get('/about', pageController.getAboutPage);
router.get('/login', pageController.getLoginPage);
router.get('/node-course', pageController.getNodeCoursePage);

// Export router
export default router;
