let mongoose = require('mongoose');
let account = require('../model/AccountModel');
const bcrypt = require('bcrypt');

exports.handleSignIn = (req, res) => {
    let name = req.body.username;
    let password = req.body.password;

    if (password) {
        account.findOne({ username: name }, (err, account) => {
            if (err) res.json({
                status: false,
                account: ""
            });
            console.log(account.password);
            bcrypt.compare(password, account.password, (err, response) => {
                if (err) console.log(err);
    
                if (response) {
                    res.json({
                        status: true,
                        account: account
                    })
                } else {
                    res.json({
                        status: false,
                        account: ""
                    })
                }
            });
        });
    } else {
        res.json({
            status: false,
            account: ""
        });
    }
}