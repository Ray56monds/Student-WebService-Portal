import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error getting courses:", error);
    res.status(500).json({ message: "Error getting courses" });
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
      res.status(404).json({ message: "Course not found" });
    } else {
      res.status(200).json(course);
    }
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({ message: "Error getting course" });
  }
};

// Create a new course
export const createCourse = async (req, res) => {
    try {
      // Extract the first object from the array
      const courseData = req.body[0];

      // Destructure properties from the extracted object
      const { title, description, instructor, price, rating } = courseData;

      // Log the received request body
      console.log('Received request body:', courseData);

      // Log the extracted values
      console.log('Extracted values:', { title, description, instructor, price, rating });

      const newCourse = await prisma.course.create({
        data: {
          title,
          description,
          instructor,
          price,
          rating,
          createdAt: new Date(),
        },
      });
  
      res.status(201).json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Error creating course" });
    }
};
  
// Update course by ID
export const updateCourseById = async (req, res) => {
  const courseId = req.params.courseId;
  const { title, description, instructor, price, rating } = req.body;
  try {
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(courseId) },
      data: {
        title,
        description,
        instructor,
        price,
        rating,
      },
    });
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course" });
  }
};

// Delete course by ID
export const deleteCourseById = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    await prisma.course.delete({
      where: { id: parseInt(courseId) },
    });
    res.status(204).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Error deleting course" });
  }
};
