// courseRoutes.js

import express from "express";
import * as courseController from '../controllers/courseController'; //imports the controller functions

const router = express.Router();

// Routes
router.post('/', courseController.createCourse);  //creates a new course
router.get('/', courseController.getAllcourses); //gets all courses
router.get(':courseId',courseController.getCourseById); //get a course by ID
router.patch('/:courseId', courseController.updateCourseById); //updates a course by ID
router.delete('/:courseId', courseController.deleteCourseById); //deletes a course by ID

export default router;