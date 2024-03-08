const mongoose = require('mongoose');


// Define the User schema
const userSchema = mongoose.Schema({
    username: { type: String, unique: true }

});
userSchema.set('toObject', { virtual: true })
userSchema.set('toJSON', { virtual: true })

// userSchema.virtual('products', {
//     'ref': 'Product',
//     'localField': '_id',
//     'foreignField': 'owner'  // DON'T Use this Vertual Here
// });


const User = mongoose.model('User', userSchema);
module.exports = User;