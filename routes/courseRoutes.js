import express from 'express';
import * as courseController from '../controllers/courseController.js';

const router = express.Router();

router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.patch('/:courseId', courseController.updateCourseById);
router.delete('/:courseId', courseController.deleteCourseById);

export default router;
