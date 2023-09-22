const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
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
            ref: 'User',
        }],
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    });

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

const userId = [];

User.findById(userId).populate('friends').then((user) => {
    if(user){
        console.log(`User ${user.username} has ${user.friendCount} friends`);
    }else {
        console.log('User not found');
    }
    }).catch((err) => {
        console.error(err);
});

module.exports = User;
