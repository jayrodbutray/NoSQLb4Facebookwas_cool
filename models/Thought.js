
const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {

    reactionId: {
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
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
      },
      {
      toJSON: {
        getters: true,
      },
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

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

  module.exports = Thought;
