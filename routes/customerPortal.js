var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = require("firebase-admin");
var models = require('../models');

/**
 * Renders a list of all appointments in the customer portal index.
 */
router.get('/', function(req, res) {
    models.Appointment.findAll().then(function(appointments) {
        return res.render('customerPortal', {
            title: 'Customer Portal',
            appointments: appointments
        })
    });
});

router.post('/', function(req, res) {

    var workid = req.body.worker;
    var date = req.body.date;
    var appointTime = req.body.usr_time;

    admin.auth().verifyIdToken(idToken)
        .then(function (decodedToken) {
            var uid = decodedToken.uid;
            models.Customer.findOne({
                where: {
                    user_id: uid
                }
            }).then(function (user) {
                if (user) {
                    console.log('user already exists');
                } else {
                    models.Appointment.create({


                        time: new Datet(date + " " + time),
                        customer_id: uid,
                        worker_id: workid,
                        isActive: false,
                        isInitial: true
                    });
                    res.redirect('/createProfile');
                }}).catch(function(error) {
                console.log('error');
            });
        });

    // if () {
    //
    // }
});

module.exports = router;
