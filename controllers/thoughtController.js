const { Thought, User } = require('../models');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({})
        .select('-__v');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);

        const user = await User.findOne({ _id: req.body.userId });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.thoughts.push(thought._id);

        await user.save();

        return res.status(201).json(thought);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
},


  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      thought.reactions.push(req.body);

      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === req.params.reactionId
      );

      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'Reaction not found' });
      }

      thought.reactions.splice(reactionIndex, 1);

      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


};
