const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// define user schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//pass in result of requiring the package we installed
// this adds on a field for username and password and make sure
// they're all unique
UserSchema.plugin(passportLocalMongoose);

// compile the model
module.exports = mongoose.model('User', UserSchema);