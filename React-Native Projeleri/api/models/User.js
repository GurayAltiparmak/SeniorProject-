const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
    verified:{ type: Boolean, default: false},
    verificationToken: String,
    kilo: Number,
    boy: Number
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)

module.exports = User;