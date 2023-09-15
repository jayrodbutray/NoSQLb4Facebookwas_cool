const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;


const reactionSchema = new mongoose.Schema({
    content: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

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

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const thoughtId = [];

Thought.findById(thoughtId, (err, thought) =>{
    if(err) {
        console.error(err);
        return;
    }
    console.log(`Thought with ID ${thoughtId} has ${thought.reactionCount} reactions.`);
});


        const Thought = mongoose.model('Thought', thoughtSchema);

        module.exports = Thought;