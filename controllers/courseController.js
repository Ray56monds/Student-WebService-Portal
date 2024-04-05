import { PrismaClient } from "@prisma/client";
import HttpStatus from 'http-status-codes';

const prisma = new PrismaClient();

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(HttpStatus.OK).json(courses);
  } catch (error) {
    console.error("Error getting courses:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error getting courses" });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) },
    });
    if (!course) {
      res.status(HttpStatus.NOT_FOUND).json({ message: "Course not found" });
    } else {
      res.status(HttpStatus.OK).json(course);
    }
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error getting course" });
  }
};

// Create a new course
export const createCourse = async (req, res) => {
    try {
      const courseData = req.body;
      const newCourse = await prisma.course.create({
        data: courseData,
      });
  
      res.status(HttpStatus.CREATED).json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error creating course" });
    }
};
  
// Update course by ID
export const updateCourseById = async (req, res) => {
  const courseId = req.params.courseId;
  const courseData = req.body;
  try {
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(courseId) },
      data: courseData,
    });
    res.status(HttpStatus.OK).json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error updating course" });
  }
};

// Delete course by ID
export const deleteCourseById = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    await prisma.course.delete({
      where: { id: parseInt(courseId) },
    });
    res.status(HttpStatus.NO_CONTENT).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error deleting course" });
  }
};
