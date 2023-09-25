const {Thought, User } = require('../models');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }
  
      if (user.friends.includes(req.params.friendId)) {
        return res.status(400).json({ message: 'Friend already added' });
      }
  
      user.friends.push(friend);
      await user.save();
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      const friendIdToRemove = req.params.friendId;
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.friends = user.friends.filter(friendId => friendId !== friendIdToRemove);
      await user.save();
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
};