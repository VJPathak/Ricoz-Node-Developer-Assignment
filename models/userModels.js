const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true }
});

// Specify the collection name explicitly
const User = mongoose.model('User', userSchema, 'users'); // Use 'User' for model name, 'users' for collection name

module.exports = User;