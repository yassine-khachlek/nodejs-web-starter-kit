var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

var appGlobal = {};

var routes = [];
var routesFiles = [];

// Get the list of routes files
fs.readdirSync(path.resolve(__dirname, 'routes')).forEach(function(fileName) {
  // Filter *.js
  if( fileName.split('.')[ fileName.split('.').length-1 ] === 'js' ){
    routesFiles.push(fileName.split('.')[0]);
  }
});

routesFiles.forEach(function(val, index){
  routes[val] = require('./routes/' + val);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // NOT WORKING WITH enctype="multipart/form-data"
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Needed for passport seesion and flash messages
app.use(session({ secret: 'veryverysecretsecret', cookie: { maxAge: 1000*60*60*24 } })); // One day
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

Object.keys(routes).forEach(function(key){

  // Use the filename as an uri
  app.use('/'+key, routes[key]);

  // Set index file as a home page at /
  if( key === 'index' ){
    app.use('/', routes[key]);
  }

});

appGlobal.routes = routesFiles

app.set('app', appGlobal);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
