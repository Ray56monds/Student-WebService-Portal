import { PrismaClient } from "@prisma/client";
import HttpStatus from 'http-status-codes';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken, verifyTokenMiddleware } from './jwt-auth';

const prisma = new PrismaClient();

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  age: Joi.number().integer().min(18).max(100).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeat_password: Joi.ref('password'),
});

class UserController {
  // Register a new user
  async registerUser(req, res) {
    const { name, email, age, password } = req.body;
    const { error } = userSchema.validate({ name, email, age, password });
    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(HttpStatus.CONFLICT).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({ data: { name, email, age, password: hashedPassword } });

      const token = generateToken({ id: newUser.id, email: newUser.email });
      res.status(HttpStatus.CREATED).json({ user: newUser, token });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error creating user" });
    }
  }

  // Login an existing user
  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.status(HttpStatus.OK).json({ user, token });
  }

  // Get all users
  @verifyTokenMiddleware
  async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error getting users" });
    }
  }

  // Get user by ID
  @verifyTokenMiddleware
  async getUserById(req, res) {
    const userId = parseInt(req.params.userId);
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
      } else {
        res.status(HttpStatus.OK).json(user);
      }
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error getting user" });
    }
  }

  // Create a new user
  async createUser(req, res) {
    try {
      const userData = req.body;
      const { error } = userSchema.validate(userData);
      if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0].message });
      }
      const newUser = await prisma.user.create({
        data: userData,
      });
      res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error creating user" });
    }
  }

  // Update user by ID
  @verifyTokenMiddleware
  async updateUserById(req, res) {
    const userId = parseInt(req.params.userId);
    const { name, email, age } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          email,
          age: parseInt(age),
        },
      });
      if (!updatedUser) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
      } else {
        res.status(HttpStatus.OK).json(updatedUser);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error updating user" });
    }
  }

  // Delete user by ID
  @verifyTokenMiddleware
  async deleteUserById(req, res) {
    const userId = parseInt(req.params.userId);
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });
      res.status(HttpStatus.NO_CONTENT).json(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error deleting user" });
    }
  }
}

export default UserController;