import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users: User[] = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Error getting users' });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    const userId = parseInt(req.params.userId);
    try {
      const user: User | null = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Error getting user' });
    }
  }

  // Create a new user
  static async createUser(req, res) {
    try {
      const { name, email, age } = req.body;
      const newUser: User = await prisma.user.create({
        data: {
          name,
          email,
          age,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  // Update user by ID
  static async updateUserById(req, res) {
    const userId = parseInt(req.params.userId);
    const { name, email, age } = req.body;
    try {
      const updatedUser: User = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          email,
          age,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
  }

  // Delete user by ID
  static async deleteUserById(req, res) {
    const userId = parseInt(req.params.userId);
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
      res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  }
}
