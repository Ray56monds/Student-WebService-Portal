import express from 'express';
import * as courseController from '../controllers/courseController.js';

const courseRouter = express.Router();

// Define routes for CRUD operations on courses
courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/:courseId', courseController.getCourseById);
courseRouter.post('/', courseController.createCourse);
courseRouter.patch('/:courseId', courseController.updateCourseById);
courseRouter.delete('/:courseId', courseController.deleteCourseById);

// Add error handling middleware
courseRouter.use((err, req, res, next) => {
  console.error("Error handling middleware:", err);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
});

export default courseRouter;