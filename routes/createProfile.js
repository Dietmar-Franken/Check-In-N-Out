var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var models = require('../models');

router.get('/', function(req, res) {
    res.render('createProfile', { title: 'createProfile' });
});

router.post('/', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var role = req.body.role;

    models.User.findOne({ where: {
        firebase_id: user.uid
    }}).then(function(user) {
        if (user) {
            console.log('user already exists');
        } else {
            models.User.create({
                firebase_id: user.uid,
                email: user.email,
                isInitial: true
            });
        }
    }).then(function() {
        return res.redirect('/createProfile');
    });
});

module.exports = router;
