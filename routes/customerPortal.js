var express = require('express');
var router = express.Router();
var models = require('../models');
var firebase = require('firebase');
var admin = require("firebase-admin");
var async = require('async');

/**
 * Renders a list of all appointments and gets all workers in the customer portal index.
 */
router.get('/', function(req, res) {
    var body = {};
    async.parallel([
        function (callback) {
            firebase.auth().currentUser.getToken(true).then(function (idToken) {
                admin.auth().verifyIdToken(idToken)
                    .then(function (decodedToken) {
                        var uid = decodedToken.uid;
                        models.Appointment.findAll({
                            where: {
                                isActive: false
                            }
                        }).then(function (unavailableAppointments) {
                            if (unavailableAppointments) {
                                body.unavailableAppointments = unavailableAppointments;
                            } else {
                                console.log('no unavailable appointments');
                            }
                            callback();
                        });
                    });
            });
        },
        function (callback) {
            firebase.auth().currentUser.getToken(true).then(function (idToken) {
                admin.auth().verifyIdToken(idToken)
                    .then(function (decodedToken) {
                        var uid = decodedToken.uid;
                        models.Appointment.findAll({
                            where: {
                                isActive: true
                            }
                        }).then(function (availableAppointments) {
                            if (availableAppointments) {
                                body.availableAppointments = availableAppointments;
                            } else {
                                console.log('no available appointments');
                            }
                            callback();
                        });
                    });
            });
        },
        function(callback) {
            models.Worker.findAll().then(function (workers) {
                if (workers) {
                    body.workers = workers;
                } else {
                    console.log('no workers');
                }
                callback();
            });
        }], function (err) {
        if (err) {
            console.log(err);
        }
        console.log(JSON.stringify(body, undefined, 2));
        return res.render('customerPortal', {
            title: 'Customer Portal',
            body: body
        });
    });
});

module.exports = router;