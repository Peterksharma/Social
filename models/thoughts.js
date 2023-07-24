// Define Mongoose
const mongoose = require('mongoose');

const thoughtsSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 128,
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
    reactions: [
        {
            //These are not correct
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        {
        toJSON: {
            virtuals: true,
        },
        id: false, 
    }
    ],
});


thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = mongoose.model('Thoughts', thoughtsSchemahoughtsSchema);

//Export the User
module.exports = Thoughts;


//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

// const mongoose = require('mongoose');

// const reactionsSchema = new mongoose.Schema({
//     reactionId: {
//         //Needs to be fix
//     },
//     reactionBody: {
//         type: String,
//         required: true,
//         max: 280,
//     },

//     username: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         //date, Set default value to the current timestamp, Use a getter method to format the timestamp on query
//     },
// });

// const Reactions = mongoose.model('Reactions', reactionsSchema);

// module.exports = Reactions;
