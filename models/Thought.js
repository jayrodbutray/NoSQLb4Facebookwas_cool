
const { Schema, Types, model } = require('mongoose');

function dateFormat(createdAtVal) {
  const date = new Date(createdAtVal);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1 and pad with '0' if necessary
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

const ReactionSchema = new Schema(
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
            default: Date.now,
            get: dateFormat,
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
            default: Date.now,
            get: dateFormat,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
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
