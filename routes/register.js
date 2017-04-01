var express = require('express');
var router = express.Router();

/* GET register page. */
/* router.get('/', function(req, res, next) {
    res.redirect('register');
}); */

router.get('/', function(req, res) {
    res.render('register', { title: 'register' });
});

router.post('/', function(req, res) {
    var email = req.body.email;
    console.log(email);
    var password = req.body.password;
    res.redirect('signIn');
});

module.exports = router;
