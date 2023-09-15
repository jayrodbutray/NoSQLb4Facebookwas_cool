const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
const thoughtsSchema = require('./Thought');

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
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        thoughts: [thoughtsSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
