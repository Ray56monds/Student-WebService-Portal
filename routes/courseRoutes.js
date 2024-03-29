import express from 'express';
import * as courseController from '../controllers/courseController.js';

const router = express.Router();

<<<<<<< HEAD
=======
// Define routes for CRUD operations on courses
>>>>>>> bfc87c8474f2b88696ff493fe98f104874a918e1
router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.patch('/:courseId', courseController.updateCourseById);
router.delete('/:courseId', courseController.deleteCourseById);

export default router;
