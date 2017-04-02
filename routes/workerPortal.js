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
                        models.User.findOne({
                            where: {
                                firebase_id: uid
                            }
                        }).then(function (user) {
                            models.Worker.findOne({
                                where: {
                                    user_id: user.id
                                }
                            }).then(function (worker) {
                                console.log('worker', worker);
                                models.Appointment.findAll({
                                    where: {
                                        worker_id: worker.id,
                                        isActive: false
                                    }
                                }).then(function (inactiveAppointments) {
                                    if (inactiveAppointments) {
                                        body.inactiveAppointments = inactiveAppointments;
                                    }
                                    callback();
                                });
                            });
                        });
                    });
            });
        },
        function (callback) {
            firebase.auth().currentUser.getToken(true).then(function (idToken) {
                admin.auth().verifyIdToken(idToken)
                    .then(function (decodedToken) {
                        var uid = decodedToken.uid;
                        models.User.findOne({
                            where: {
                                firebase_id: uid
                            }
                        }).then(function (user) {
                            models.Worker.findOne({
                                where: {
                                    user_id: user.id
                                }
                            }).then(function (worker) {
                                models.Appointment.findAll({
                                    where: {
                                        worker_id: worker.id,
                                        isActive: true
                                    }
                                }).then(function (activeAppointments) {
                                    if (activeAppointments) {
                                        body.activeAppointments = activeAppointments;
                                    }
                                    callback();
                                });
                            });
                        });
                    });
            });
        }], function (err) {
        if (err) {
            console.log(err);
        }
        console.log(JSON.stringify(body, undefined, 2));
        return res.render('workerPortal', {
            title: 'Worker Portal',
            body: body
        });
    });
});

module.exports = router;