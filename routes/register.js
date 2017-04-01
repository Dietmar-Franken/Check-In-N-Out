var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = require("firebase-admin");
var models = require('../models');

router.get('/', function(req, res) {
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var userInfo = {};
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // if user somehow already exists, e.g. from backspacing from create profile page, just sign him out
            firebase.auth().signOut().then(function () {
                res.redirect('/signIn');
            }, function (error) {
                console.error('Sign Out Error', error);
            });
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
                userInfo.user = user;
                firebase.auth().currentUser.getToken(true).then(function (idToken) {
                    admin.auth().verifyIdToken(idToken)
                        .then(function (decodedToken) {
                            var uid = decodedToken.uid;
                            userInfo.uid = uid;
                            models.User.findOne({
                                where: {
                                    firebase_id: uid
                                }
                            }).then(function (user) {
                                if (user) {
                                    console.log('user already exists');
                                } else {
                                    models.User.create({
                                        firebase_id: uid,
                                        email: userInfo.user.email,
                                        isInitial: true
                                    });
                                }
                            }).then(function () {
                                return res.redirect('/createProfile');
                            });
                        });
                });
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                res.redirect('signIn');
            });
        }
    });
});

module.exports = router;
