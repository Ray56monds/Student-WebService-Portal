import express from 'express';
import * as courseController from '../controllers/courseController.js';

const router = express.Router();

// Define routes for CRUD operations on courses
router.post('/', courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);
router.patch('/:courseId', courseController.updateCourseById);
router.delete('/:courseId', courseController.deleteCourseById);

export default router;