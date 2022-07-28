const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        // destructure from req.body
        const { email, username, password } = req.body;
        const user = new User({ email, username }); // create instance of a User
        // takes the instance of user and hashed password result
        const registeredUser = await User.register(user, password);
        // when a user successfully registers, actually log the user in instead of redirecting to login pg
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds'; //a user could click straight to login
    delete req.session.returnTo; // deletes remnants inside returnTo
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout(); // utilizes passport
    req.flash('success', 'Logged out successfully.');
    res.redirect('/campgrounds');
}