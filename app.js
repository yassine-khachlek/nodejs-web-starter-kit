var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var mongooseSchema = mongoose.Schema;

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;

var session = require('express-session');
var flash = require('connect-flash');

var app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'default';
process.app = {};


var appGlobal = {};

var autoload = require('./bootstrap/autoload')({
  "env": process.env.NODE_ENV,
  "configPath": path.resolve(__dirname, 'config'),
  "routesPath": path.resolve(__dirname, 'routes'),
  "packagesPath": path.resolve(__dirname, 'packages'),
  "mongoose": mongoose,
});

autoload.on('done', function(err, data){

  if(err){
  
    return console.log(err);

  }else{
  
      console.log(data)

      appGlobal = data;

      // view engine setup
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'jade');
      // Set the basedir for views let me use extends /layout,
      // so no problem when moving the views files inside subfolders,
      // and relative layout path is still working.
      app.locals.basedir = path.join(__dirname, 'views');

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

      Object.keys(appGlobal.routes).forEach(function(val, key){
        // Use the filepath as an uri
        app.use(appGlobal.routes[val].uri, appGlobal.routes[val].router);

        // Set the index files as landing page for the folder routes and its subfolders
        if( appGlobal.routes[val].uri.split('/')[ appGlobal.routes[val].uri.split('/').length-1 ] === 'index' ){
          uri = appGlobal.routes[val].uri.split('/');
          uri.pop();
          uri = uri.join('/') + '/';
          app.use(uri, appGlobal.routes[val].router);
          
          // add the new route to routes
          // very important for angular
          var tmp = {
            'filePath': appGlobal.routes[val].filePath,
            'uri': uri,
            'router': appGlobal.routes[val].router,
          };

          appGlobal.routes[ appGlobal.routes[val].filePath ] = tmp;

        }
      });

      app.set('app', appGlobal);

      // catch 404 and forward to error handler
      app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        err.uri = req.protocol + '://' + req.get('host') + req.originalUrl;
        next(err);
      });


      // error handlers

      // development error handler
      // will print stacktrace
      if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
            base: appGlobal.base,
            xhr: req.xhr,
            error: err
          });
        });
      }

      // production error handler
      // no stacktraces leaked to user
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          base: appGlobal.base,
          xhr: req.xhr,
          error: {}
        });
      });

  }

});

autoload.getConfig();

module.exports = app;
