var express = require('express');
var router = express.Router();

/**
 * Renders the sign-in page.
 */
router.get('/', function(req, res) {
    res.render('signIn', { title: 'Sign In' });
});

module.exports = router;
