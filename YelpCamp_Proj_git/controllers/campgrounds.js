const Campground = require('../models/campground'); // Require my model
const { cloudinary } = require('../cloudinary');
//const catchAsync = require('../utils/catchAsync');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN; // grab the token
// contains forward and reverse geocoding
const geocoder = mbxGeocoding({ accessToken: mapBoxToken }); //pass token thru


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({}); // find all campgrounds
    // Pass thru to template
    res.render('campgrounds/index.ejs', { campgrounds }); // render index page

};

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
};

module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    //console.log(geoData);

    //if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;

    // loop over files and take path and filename and add them into the newly created campground
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id; // saves the author's username whom created the new campground
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully created a new campground.');
    // redirect to newly created campground
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
    // Extract the id
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(campground);
    // if campground was deleted
    if (!campground) {
        req.flash('error', 'Campground not found.');
        return res.redirect('/campgrounds');
    }
    // otherwise render show page
    res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    // Look up campground by id (like show route)
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found.');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });

};

module.exports.updateCampground = async (req, res) => {
    //res.send('IT WORKED');
    const { id } = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs); // don't pass an array, just the data from the array into push
    await campground.save();
    // if there are images to delete, update campground and pull from images array all imgs where 
    // the filename of that img is in req.body.deleteImages array
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename); // deletes imgs from cloudinary too
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        console.log(campground);
    }
    req.flash('success', 'Successfully updated campground.');
    // Redirect to updated Show page
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
};