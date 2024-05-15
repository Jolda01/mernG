const express = require('express');
const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const router = express.Router();

// Create a new user
router.post('/create', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({ name, email, password: hashedPassword });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await userService.updateUser(userId, { name, email, password: hashedPassword });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Add a task to a user
router.post('/:userId/tasks/add', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { task } = req.body;
    const user = await userService.addTask(userId, task);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task to user' });
  }
});

// Complete a task for a user
router.put('/:userId/tasks/complete/:taskId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const user = await userService.completeTask(userId, taskId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

// Delete a task for a user
router.delete('/:userId/tasks/delete/:taskId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const user = await userService.deleteTask(userId, taskId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the provided password matches the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Password is valid, return the user
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
