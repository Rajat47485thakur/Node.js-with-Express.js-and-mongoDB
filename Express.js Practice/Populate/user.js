const mongoose = require('mongoose');


// Define the User schema
const userSchema = mongoose.Schema({
    username: { type: String, unique: true }

});
userSchema.set('toObject', { virtual: true })
userSchema.set('toJSON', { virtual: true })



const User = mongoose.model('User', userSchema);
module.exports = User;