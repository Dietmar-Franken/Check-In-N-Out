var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/**
 * Renders the sign-in page.
 */
router.get('/', function(req, res) {
    res.render('signIn', { title: 'Sign In' });
});

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        console.log('success');
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.render('signIn', { title: 'Sign In' });
    });
});

module.exports = router;
