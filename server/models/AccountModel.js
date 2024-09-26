const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required field'],
    },
    email: {
        type: String,
        required: [true, 'email is required field'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    //metadata
    dateCreated: {
        type: Date
    },
    lastLogin: {
        type: Date,
        default : null
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;