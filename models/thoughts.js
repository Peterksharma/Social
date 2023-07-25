// Define Mongoose
const mongoose = require('mongoose');

const reactionsSchema = new mongoose.Schema({
    reactionID: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()

    },
    reactionBody: {
        type: String,
        required: true,
        max: 280,
    },
    username: {
        type: String,
        required: true,
    },


})

const thoughtsSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280,
    },
    createdAt: {
        lastAccessed: {
            type: Date,
            default: Date.now
        },
        //date, Set default value to the current timestamp, Use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema],
}, { toJSON: { virtuals: true } });


thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = mongoose.model('Thoughts', thoughtsSchema);

//Export the User
module.exports = Thoughts;