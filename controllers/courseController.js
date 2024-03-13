// courseController.js

import fs from 'fs';
import path from 'path';

const coursesFilePath = path.join(__dirname, '..', 'courses.json');

// Get all courses
export const getAllcourses = (req, res) => {
    try {
        const coursesData = fs.readFileSync(coursesFilePath, 'utf-8');
        const courses = JSON.parse(coursesData);
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error getting courses' });
    }
};

// Get a course by ID
export const getCourseById = (req, res) => {
    const courseId = req.params.courseId;
    try {
        const coursesData = fs.readFileSync(coursesFilePath, 'utf-8');
        const courses = JSON.parse(coursesData);
        const course = courses.find(c => c._id === courseId);
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.status(200).json(course);
        }   
    } catch (error) {
        res.status(500).json({ message: 'Error getting course' }); 
    }
};

// create a new course
export const createCourse = (req, res) => {
    try{
        const { title, description, instructor, price, rating } = req.body;
        const newCourse = {
            _id: `course_id${Math.floor(Math.random() * 1000)}`, //this generates a unique ID
            title,
            description,
            instructor,
            price,
            createdAt: new Date().toISOString(), //this will generate the current date and time
        };
        const coursesData = JSON.parse(fs.readFileSynce(coursesFilePath, 'utf-8'));
        coursesData.push(newCourse);
        fs.writeFileSync(coursesFilePath, JSON.stringify(coursesData, null, 2));
        res.status(201).json(newCourse);
    }catch (error) {
        res.status(500).json({ message: 'Error creating course' });
    }
};

// update a course by ID
export const updateCourseById = (req, res) => {
    const courseId = req.params.courseId;
    const { title, description, instructor, price } = req.body;
    try {
        let coursesData = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));
        const courseIndex = coursesData.findIndx((course) => course._id === courseId);
        if (courseIndex === -1) {
            res.status(404).json({ message: 'course not fournd' });
        } else {
            coursesData[courseIndex] = {
                ...coursesData[courseIndex],
                title: title || coursesData[courseIndex].title,
                description: description || coursesData[courseIndex].description,
                instructor: instructor || coursesData[courseIndex].instructor,
                price: price || coursesData[courseIndex].price,
            };
            fs.writeFileSync(coursesFilePath, JSON.stringify(coursesData, null, 2));
            res.status(200).json(coursesData[courseIndex]);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating course' });
    }
};

// Delete a course by ID
export const deleteCourseById = (req, res) => {
    const courseId = req.params.courseId;
    try {
        let coursesData = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));
        const updatedCoursesData = coursesData.filter((course) => course._id !== courseId);
        if (updatedCoursesData.length === coursesData.length) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            fs.writeFileSync(coursesFilePath, JSON.stringify(updatedCoursesData, null, 2));
            res.status(204).json({ message: 'Course deleted successfully' });
        }
    } catch (error) {
        res.status (500).json({ message: 'Error deleting course' });
    }
};
