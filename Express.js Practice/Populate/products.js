const mongoose = require('mongoose');

// Define the User schema
const productSchema = mongoose.Schema({
    product: { type: String, unique: true },

    price: { type: Number },

    owner: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    }
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
