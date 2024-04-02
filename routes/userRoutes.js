import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Define routes for CRUD operations on users
router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUserById);
router.delete('/:userId', userController.deleteUserById);

export default router;
