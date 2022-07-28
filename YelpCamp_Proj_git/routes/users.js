const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

//router.get('/logout', users.logout)


// Define first route
// router.get('/register', users.renderRegister);

// // Route to submit the registration form to
// router.post('/register', catchAsync(users.register));

// router.get('/login', users.renderLogin);

// // pssport.authenticate() is middleware that expects us to specify strategy local
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

// // Log out route gave req#logout requires a callback function error
// router.get('/logout', users.logout);


// Logout route changed due to passportJS version update
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    });
});

module.exports = router;