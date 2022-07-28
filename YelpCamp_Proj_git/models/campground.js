const mongoose = require('mongoose');
//const { campgroundSchema } = require('../schemas');
const Review = require('./review');
const Schema = mongoose.Schema;

// to reference
// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/YelpCamp/gxgle1ovzd2f3dgcpass.png

const ImageSchema = new Schema({
    url: String,
    filename: String
});

// Use virtual since we don't store in our db
ImageSchema.virtual('thumbnail').get(function () {
    // this refers to the particular img
    return this.url.replace('/upload', '/upload/w_200'); // changes width size to 200 px
})

// Make  our Schema
const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId, // objectid 
            ref: 'Review' // from the review model
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    // if something was found, delete all reviews where their id field was in the document we just deleted in its reviews
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

// Export model to compile
module.exports = mongoose.model('Campground', CampgroundSchema);
