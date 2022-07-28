const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review'); // require review model..or destructure at top(same file of joi schema)

// Ensure a user is logged in before they can access the route
module.exports.isLoggedIn = (req, res, next) => { //now can import from campgrounds
    //console.log('REQ.USER...', req.user); // checks if someone is signed in on gitbash
    // if you are not authenticated(from passport), 
    // redirect back to login page
    //req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in to view this page.');
        return res.redirect('/login'); //return to avoid headers error
    }
    // otherwise you are authenticated, call next
    next();
};

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        // details is an array of objects, so we need to map
        // over them and return a single new array we join
        // into a string
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next(); //go to next route handler
    }
};
// Middleware to find campground by id and check if it's owner matches 
// check to see if you own the campground
// if not, you get redirected to show pg
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) { // if author does not own the campground/current logged in user
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    // otherwise call next
    next();
};

// Middleware to delete a review
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) { // if author does not own the campground/current logged in user
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    // otherwise call next
    next();
};

// Validate review middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next(); //go to next route handler
    }
};
