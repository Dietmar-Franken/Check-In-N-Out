var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = require("firebase-admin");
var models = require('../models');

router.get('/', function(req, res) {
    res.render('createProfile', { title: 'Create Profile' });
});

router.post('/', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var role = req.body.role;
    firebase.auth().currentUser.getToken(true).then(function(idToken) {
        admin.auth().verifyIdToken(idToken)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                models.User.findOne({ where: {
                    firebase_id: uid
                }}).then(function(user) {
                    if (user) {
                        user.updateAttributes({
                            firstname: firstname,
                            lastname: lastname,
                            isInitial: false,
                            role: role
                        });
                        console.log('asdiuhsaiudhs', user);
                        if (user.role == 1) { // if worker
                            res.redirect('/workerPortal');
                        } else if (user.role == 2) { // if customer
                            res.redirect('/customerPortal');
                        } else if (user.role == 3) { // if securityPerson
                            console.log('securityPerson');
                        } else {
                            console.log("error!");
                        }
                    } else {
                        console.log('user doesn\'t exist!');
                    }
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
            });
    });
});

module.exports = router;
