import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const coursesFilePath = path.join(__dirname, '..', 'courses.json');

export const getLoginPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getNodeCoursePage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'node-course.html'));
    } catch (error) {
        console.error('Error rendering node-course page:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const handleLogin = (req, res) => {
    const { password } = req.body;
    const hardcodedPassword = 'Password1234';
    try {
        if (password === hardcodedPassword) {
            res.redirect('/node-course');
        } else {
            res.redirect('/login?error=1');
        }
    } catch (error) {
        console.error('Error handling login:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getAllCourses = (req, res) => {
    try {
        const coursesData = fs.readFileSync(coursesFilePath, 'utf-8');
        const courses = JSON.parse(coursesData);
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error getting courses' });
    }
};

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

export const createCourse = (req, res) => {
    try {
        const { title, description, instructor, price, rating } = req.body;
        const newCourse = {
            _id: `course_id${Math.floor(Math.random() * 1000)}`,
            title,
            description,
            instructor,
            price,
            rating,
            createdAt: new Date().toISOString(),
        };
        const coursesData = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));
        coursesData.push(newCourse);
        fs.writeFileSync(coursesFilePath, JSON.stringify(coursesData, null, 2));
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course' });
    }
};

export const updateCourseById = (req, res) => {
    const courseId = req.params.courseId;
    const { title, description, instructor, price, rating } = req.body;
    try {
        let coursesData = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));
        const courseIndex = coursesData.findIndex((course) => course._id === courseId);
        if (courseIndex === -1) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            coursesData[courseIndex] = {
                ...coursesData[courseIndex],
                title: title || coursesData[courseIndex].title,
                description: description || coursesData[courseIndex].description,
                instructor: instructor || coursesData[courseIndex].instructor,
                price: price || coursesData[courseIndex].price,
                rating: rating || coursesData[courseIndex].rating,
            };
            fs.writeFileSync(coursesFilePath, JSON.stringify(coursesData, null, 2));
            res.status(200).json(coursesData[courseIndex]);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating course' });
    }
};

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
        res.status(500).json({ message: 'Error deleting course' });
    }
};