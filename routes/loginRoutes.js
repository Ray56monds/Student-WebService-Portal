import express from 'express';
import LoginController from '../controllers/LoginController.js';

const loginRouter = express.Router();

// Define login route using the controller class method
loginRouter.post('/', LoginController.loginUser);

export default loginRouter;
