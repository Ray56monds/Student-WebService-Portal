import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ message: "Error getting users" });
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
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ message: "Error getting user" });
    }
  }

// Create a new user
async createUser(req, res) {
  try {
    // Extract the user data from the request body array
    const userData = req.body[0]; // Assuming the user data is the first element of the array

    // Destructure properties from the user data object
    const { name, email, age } = userData;

    // Log the received request body
    console.log('Received request body:', userData);

    // Log the extracted values
    console.log('Extracted Values:', { name, email, age });

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
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
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  }

  // Delete user by ID
  async deleteUserById(req, res) {
    const userId = parseInt(req.params.userId);
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
      res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  }
}

export default new UserController();