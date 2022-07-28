const express = require('express');
const router = express.Router({ mergeParams: true }); // to avoid campground null
// Import middleware
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

// utilities
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
// models
const Campground = require('../models/campground'); // Require my model
const Review = require('../models/review'); // require review model

// controller
const reviews = require('../controllers/reviews');

// Review schema
//const { reviewSchema } = require('../schemas.js'); //joi schema, not mongoose schema

// route to associate a campground with a review
router.post('/', validateReview, isLoggedIn, catchAsync(reviews.createReview));

// delete a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;