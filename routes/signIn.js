var express = require('express');
var router = express.Router();

/**
 * Renders the sign-in page.
 */
router.get('/', function(req, res) {
    res.render('signIn', { title: 'Sign In' });
});

router.post('/', function(req, res) {
    var email = req.body.email;
    console.log(email);
    var password = req.body.password;
    res.redirect('signIn');
});

module.exports = router;
