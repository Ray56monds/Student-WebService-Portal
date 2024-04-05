import { PrismaClient } from "@prisma/client";
import HttpStatus from 'http-status-codes';

const prisma = new PrismaClient();

class UserController {
  // Get all users
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
      res.status(HttpStatus.OK).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error updating user" });
    }
  }

  // Delete user by ID
  async deleteUserById(req, res) {
    const userId = parseInt(req.params.userId);
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
      res.status(HttpStatus.NO_CONTENT).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error deleting user" });
    }
  }
}

export default new UserController();
