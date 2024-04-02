import express from 'express';
import * as courseController from '../controllers/courseController.js';

const courseRouter = express.Router();

// Define routes for CRUD operations on courses
courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/:courseId', courseController.getCourseById);
courseRouter.post('/', courseController.createCourse);
courseRouter.patch('/:courseId', courseController.updateCourseById);
courseRouter.delete('/:courseId', courseController.deleteCourseById);

export default courseRouter;
