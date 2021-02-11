const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false
    },
    username: {
        type: String
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    state: {
        type: String,
    },
    zip_code: {
        type: String
    }
});

mongoose.model('account', AccountSchema);