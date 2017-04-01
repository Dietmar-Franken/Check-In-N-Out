var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.get('/', function(req, res) {
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    res.redirect('signIn');
});

module.exports = router;
