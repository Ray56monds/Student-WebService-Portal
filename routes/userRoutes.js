import express from 'express';
import { registerUser, loginUser, verifyUser } from './User.Controller';
import UserController from '../controllers/usersController.js';

const router = express.Router();

// Define routes for user authentication
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyUser);

// Define routes for CRUD operations on users
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.put('/:userId', UserController.updateUserById);
router.delete('/:userId', UserController.deleteUserById);

export default router;