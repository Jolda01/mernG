const UserModel = require('../models/UserModel');

const userService = {
  getUser: async (id) => {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw new Error('Failed to get user');
    }
  },
  getAllUsers: async () => {
    try {
      return await UserModel.find();
    } catch (error) {
      console.error('Failed to get users:', error);
      throw new Error('Failed to get users');
    }
  },
  getUserByEmail: async (email) => {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.error('Failed to get user by email:', error);
      throw new Error('Failed to get user by email');
    }
  },
  createUser: async (userData) => {
    try {
      const newUser = new UserModel(userData);
      const savedUser = await newUser.save();
      console.log("User saved:", savedUser);
      return savedUser;
    } catch (error) {
      console.error('Failed to save user:', error);
      throw new Error('Failed to save user: ' + error.message);
    }
  },
  updateUser: async (id, userData) => {
    try {
      return await UserModel.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user');
    }
  },
  deleteUser: async (id) => {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new Error('Failed to delete user');
    }
  },
  addTask: async (userId, taskData) => {
    try {
      const user = await UserModel.findById(userId);
      user.tasks.push(taskData);
      await user.save();
      return user;
    } catch (error) {
      console.error('Failed to add task:', error);
      throw new Error('Failed to add task');
    }
  },
  deleteTask: async (userId, taskId) => {
    try {
      const user = await UserModel.findById(userId);
      user.tasks = user.tasks.filter(task => task._id.toString() !== taskId);
      await user.save();
      return user;
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new Error('Failed to delete task');
    }
  },
  
  
};

module.exports = userService;
