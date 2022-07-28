if (process.env.NODE_ENV !== 'production') { // if not in prod mode
    require('dotenv').config();
}

console.log(process.env.SECRET);

const express = require('express');
const path = require('path'); //for views
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate'); // parses ejs

const bodyParser = require("body-parser")

const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');

const LocalStrategy = require('passport-local');
const User = require('./models/user');

// npm i method-override in gitbash
const methodOverride = require('method-override');

//const Joi = require('joi'); exporting from schema file and that depends on JOI
// Destructure for future multiple schemas
//const { campgroundSchema, reviewSchema } = require('./schemas.js');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

// Connect to name of your database
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, // error: not currently supported
    useUnifiedTopology: true,
    // useFindAndModify: false // error: not currently supported
});
const db = mongoose.connection;

// Check for error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { // If successfully opened
    console.log('Database Connected!');
});

const app = express();

app.engine('ejs', ejsMate);  // use for ejs engine
// Set the views engine and directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Set up our session
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, //extra security
        // in millisecondss, sec, hr, day, week
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

// parsing for user/register
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Session and Flash
app.use(session(sessionConfig));
app.use(flash());

// Tell app to use passport
app.use(passport.initialize());
app.use(passport.session());
// insert user model inside LocalStrat
passport.use(new LocalStrategy(User.authenticate()));
// tells passport how to serialize a user (how to store user in the session)
passport.serializeUser(User.serializeUser());
// how to get user out of that session
passport.deserializeUser(User.deserializeUser());

// Set up middleware for flash (before route handlers)
app.use((req, res, next) => {
    // fixes err: if editing pg and login, it would send me back to /campgrounds instead of editing
    // if coming from any route other than login and home, set returnTo property = wherever you're coming from
    if (!['/login', '/', '/register'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    console.log(req.session); // print the entire session
    res.locals.currentUser = req.user; // all templates have access to currentUser
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error'); //if there is anything stored in flash under the key of error
    next();
})



app.use('/', userRoutes); // user route
app.use('/campgrounds', campgroundRoutes); // uses campgrounds routes
app.use('/campgrounds/:id/reviews', reviewRoutes);

// Basic route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

/* // Make new campground (hardcoded)
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'cheap camping' });
    await camp.save();
    res.send(camp);
}) */


// For every single request (for every path *) that doesn't exist
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

// Validation err sample
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong';
    //res.status(statusCode).send(message);
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on Port 3000!');
})