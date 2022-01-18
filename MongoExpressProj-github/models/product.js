// Making mongoose model
// ( don't need to connect to db here because product.js
// will be required in index.js where the connecting is)
const mongoose = require('mongoose');

// Make schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  // name is required
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy', 'baked goods']
    }
})

// Compile model
const Product = mongoose.model('Product', productSchema);

// Export from file...
// Now can import this model and use it somewhere else
module.exports = Product;