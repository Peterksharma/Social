// Define Mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
});

// Using mongoose.model() to compile a model based on the schema
// 'Item' is the name of the model
// grocerySchema is the name of the schema we are using to create a new instance of the model
const user = mongoose.model('User', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// We use the model to create individual documents that have the properties as defined in our schema
User
    .create({
        item: 'banana',
        stockCount: 10,
        price: 1,
        inStock: true,
    })
    .then(result => console.log('Created new document', result))
    .catch(err => handleError(err));

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
    userSchema.virtual('friendCount').get(function () {
    return this.friend.length;
});

const User = mongoose.model('User', UserSchema);

//Export the User
module.exports = User;
