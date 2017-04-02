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
                            models.Customer.findOne({
                                where: {
                                    user_id: user.id
                                }
                            }).then(function (customer) {
                                console.log('customerhaha', customer);
                                models.Appointment.findAll({
                                    where: {
                                        customer_id: customer.id,
                                        isActive: false
                                    },
                                    include: [{
                                        model: models.Worker,
                                        include: [{ model: models.User }]
                                    }]
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
                            models.Customer.findOne({
                                where: {
                                    user_id: user.id
                                }
                            }).then(function (customer) {
                                models.Appointment.findAll({
                                    where: {
                                        customer_id: customer.id,
                                        isActive: true
                                    },
                                    include: [{
                                        model: models.Worker,
                                        include: [{ model: models.User }]
                                    }]
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
        },
        function(callback) {
            models.Worker.findAll({
                include: [{
                    model: models.User
                }]
            }).then(function (workers) {
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

router.post('/', function(req, res) {
    var work_id = req.body.worker;
    var date = req.body.date;
    var appointTime = req.body.usr_time;
    firebase.auth().currentUser.getToken(true).then(function (idToken) {
        admin.auth().verifyIdToken(idToken)
            .then(function(decodedToken) {
                var uid = decodedToken.uid;
                models.User.findOne({
                    where: {
                        firebase_id: uid
                    }
                }).then(function(user) {
                    models.Customer.findOne({
                        where: {
                            user_id: user.id
                        }
                    }).then(function(customer) {
                        if (customer) {
                            models.Appointment.create({
                                time: new Date(date + " " + appointTime),
                                customer_id: customer.id,
                                worker_id: work_id,
                                isActive: false,
                                isCheckedIn: true
                            });
                            res.redirect('/customerPortal');
                        } else {
                            console.log('Customer does not exist!');
                        }
                    }).catch(function (error) {
                        console.log('error!');
                    });
                }).catch(function (error) {
                    console.log("error");
                });
            });
    });
});

module.exports = router;
