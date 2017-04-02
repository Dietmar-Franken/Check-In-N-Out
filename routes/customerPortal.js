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

module.exports = router;