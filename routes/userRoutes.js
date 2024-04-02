import express from 'express';
import UserController from '../controllers/usersController.js';

const userRouter = express.Router();

// Define routes for CRUD operations on users
userRouter.post('/', UserController.createUser);
userRouter.get('/:userId', UserController.getUserById);
userRouter.get('/', UserController.getAllUsers);
userRouter.put('/:userId', UserController.updateUserById);
userRouter.delete('/:userId', UserController.deleteUserById);

export default userRouter;
