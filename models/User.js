const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            virtuals: true,
        }],
        thought: [thoughtSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const userId = [];

User.findById(userId).populate('friends').exec((err, user) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`User ${user.username} has ${user.friendCount} friends`);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
