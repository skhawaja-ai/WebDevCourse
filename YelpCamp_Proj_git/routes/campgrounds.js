const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const Campground = require('../models/campground'); // Require my model

const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

// Parse the body of req.body since by default it's empty
router.use(express.urlencoded({ extended: true }));

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

// Campground index route
//router.get('/', catchAsync(campgrounds.index));
// New route
// router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// Endpoint route where the form is submitted to
//router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
// Show page route
//router.get('/:id', catchAsync(campgrounds.showCampground));
// Route to serve the form
//router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
// Route to send the update from edit
//router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));
// Delete route to delete a campground
//router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


module.exports = router;
