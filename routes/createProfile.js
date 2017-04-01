var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = require("firebase-admin");
var models = require('../models');

router.get('/', function(req, res) {
    res.render('createProfile', { title: 'createProfile' });
});

router.post('/', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var role = req.body.role;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
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
                                    role: role
                                });
                            } else {
                                console.log('user doesn\'t exist!');
                            }
                        }).then(function() {
                            console.log('profile updated!');
                        });
                    });
            });
        } else {
            // No user is signed in.
            console.log('No user!');
        }
    });
});

module.exports = router;
