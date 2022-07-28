const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define review schema
const reviewSchema = new Schema({
    // add text
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' // refers to user model
    }
});

module.exports = mongoose.model("Review", reviewSchema);

// connect review(s) with a campground (one to many relationship) using objectid