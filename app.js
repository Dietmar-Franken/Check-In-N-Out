var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require("firebase");
var admin = require("firebase-admin");

var register = require('./routes/register');
var signIn = require('./routes/signIn');
var appointments = require('./routes/appointments');
var createProfile = require('./routes/createProfile');
var customerPortal = require('./routes/customerPortal');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', users);
app.use('/appointments', appointments);
app.use('/register', register);
app.use('/signIn', signIn);
app.use('/createProfile', createProfile);
app.use('/customerPortal', customerPortal);
app.use('/', signIn);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBe7-02KX_ueR9Cf4fUyTTwBvMPiYDpgBU",
    authDomain: "in-n-out-9f5b3.firebaseapp.com",
    databaseURL: "https://in-n-out-9f5b3.firebaseio.com",
    projectId: "in-n-out-9f5b3",
    storageBucket: "in-n-out-9f5b3.appspot.com",
    messagingSenderId: "636077247417"
};
firebase.initializeApp(config);

// Initialize serviceAccount for admin
var serviceAccount = require("./in-n-out-9f5b3-firebase-adminsdk-v4ihp-b6771868ca.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://in-n-out-9f5b3.firebaseio.com/"
});

// ORM setup
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require('./config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = app;
