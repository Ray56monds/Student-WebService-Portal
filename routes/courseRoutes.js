// Import required modules
import express from "express";
import * as courseController from '../controllers/courseController.js';

// Create a router instance
const router = express.Router();

// Define route handlers with callback functions
router.post('/', courseController.createCourse);  // Create a new course
router.get('/', courseController.getAllCourses); // Get all courses
router.get('/:courseId', courseController.getCourseById); // Get a course by ID
router.patch('/:courseId', courseController.updateCourseById); // Update a course by ID
router.delete('/:courseId', courseController.deleteCourseById); // Delete a course by ID

// Export the router
export default router;
