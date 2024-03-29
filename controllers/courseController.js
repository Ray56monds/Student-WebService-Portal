import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.course.findMany();
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error getting courses:', error);
        res.status(500).json({ message: 'Error getting courses' });
    }
};

export const getCourseById = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await prisma.course.findUnique({
            where: { id: courseId }
        });
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.status(200).json(course);
        }
    } catch (error) {
        console.error('Error getting course:', error);
        res.status(500).json({ message: 'Error getting course' });
    }
};

export const createCourse = async (req, res) => {
    try {
        const { title, description, instructor, price, rating, createdAt } = req.body;
        const newCourse = await prisma.course.create({
            data: {
                title,
                description,
                instructor,
                price,
                rating,
                createdAt: new Date(createdAt)
            }
        });
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Error creating course' });
    }
};

export const updateCourseById = async (req, res) => {
    const courseId = req.params.courseId;
    const { title, description, instructor, price, rating, createdAt } = req.body;
    try {
        const updatedCourse = await prisma.course.update({
            where: { id: courseId },
            data: {
                title,
                description,
                instructor,
                price,
                rating,
                createdAt: new Date(createdAt)
            }
        });
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Error updating course' });
    }
};

export const deleteCourseById = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        await prisma.course.delete({
            where: { id: courseId }
        });
        res.status(204).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Error deleting course' });
    }
};