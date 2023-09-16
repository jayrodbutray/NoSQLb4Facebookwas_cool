const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;


const reactionSchema = new Schema({
    content: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},

    assignmentId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
        createdAt: {
            type: Date,
            default: Date.now(),
            getters: true,
        },
      },
);

const thoughtSchema = new Schema(
    {
        content: String,
        reactions: [reactionSchema],

        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            getters: true,
        },
        username: {
            type: String,
            required: true,
        },
    }
);
const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const thoughtId = [];

Thought.findById(thoughtId)
  .then((thought) => {
    if (!thought) {
      console.log(`No thought found with ID ${thoughtId}`);
      return;
    }
    console.log(`Thought with ID ${thoughtId} has ${thought.reactionCount} reactions.`);
  })
  .catch((err) => {
    console.error(err);
  });

  module.exports = {
    Thought: model('Thought', thoughtSchema),
    Reaction: model('Reaction', reactionSchema),
  };
  
