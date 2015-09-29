var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var config = require('config');

var mongoose = require('mongoose');
var mongooseSchema = mongoose.Schema;

var mongooseConnectionUri = 'mongodb://'+config.get('databases.mongodb.host')+':'+config.get('databases.mongodb.port')+'/'+config.get('databases.mongodb.db');
var mongooseConnectionOptions = config.get('databases.mongodb.connectionOptions');
var mongooseConnection = {};
var mongooseConnectWithRetry = function() {
  mongooseConnection = mongoose.connect(mongooseConnectionUri, mongooseConnectionOptions, function(err){
    // if (err) throw err;
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(mongooseConnectWithRetry, 5000);
    }else{
      console.error('Connected to mongodb.');
    }
  });
};
mongooseConnectWithRetry();

var appGlobal = {};
appGlobal.db = {};
appGlobal.mongodb = {};
appGlobal.mongodb.databases = {};
appGlobal.mongodb.databases[config.get('databases.mongodb.db')] = {};

Object.keys(config.get('databases.mongodb.collections')).forEach(function(collection, index){
  
  appGlobal.mongodb.databases[config.get('databases.mongodb.db')][collection] = {};
  appGlobal.mongodb.databases[config.get('databases.mongodb.db')][collection].schema = new mongooseSchema(config.get('databases.mongodb.collections.' + collection).schema, config.get('databases.mongodb.collections.' + collection).schemaOptions);
  appGlobal.mongodb.databases[config.get('databases.mongodb.db')][collection].model = mongoose.model(config.get('databases.mongodb.collections.' + collection).name, appGlobal.mongodb.databases[config.get('databases.mongodb.db')][collection].schema);

});

// shared db over the process var until i found another clean solution!
// THIS IS SCRIPT WHERE SHOULD USE IT OUTSIDE THE EXPRESS ROUTER
process.db = {};

var levelup = require('level');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;

var session = require('express-session');
var flash = require('connect-flash');

Object.keys(config.get('databases.leveldb.collections')).forEach(function(collection, index){

  db = levelup(path.resolve(__dirname, 'database', config.get('databases.leveldb.collections.' + collection).name));

  process.db[collection] = db;
  appGlobal.db[collection] = db;

});

var app = express();

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

function buildRoutes(pathDir, routes){

  if(!routes){
    var routes = [];
  }

  // Get the list of routes files
  fs.readdirSync(pathDir).forEach(function(fileName) {
    
    if( fs.statSync(path.resolve(pathDir, fileName)).isFile() ){

      // Filter *.js
      if( fileName.split('.')[ fileName.split('.').length-1 ] === 'js' ){

        uri = path.resolve(pathDir, fileName);
        uri = uri.replace(path.resolve(__dirname, 'routes'), '').split('.');
        uri.pop();
        uri = uri.join();

        tmp = {
          'filePath': path.resolve(pathDir, fileName),
          'uri': uri,
          'router': require(path.resolve(pathDir, fileName)),
        };

        routes.push(tmp);

      }
      
    }

    if( fs.statSync(path.resolve(pathDir, fileName)).isDirectory() ){
      buildRoutes(path.resolve(pathDir, fileName), routes);
    }

  });

  return routes;

}

var routes = buildRoutes(path.resolve(__dirname, 'routes'));

routes.forEach(function(val, key){
  // Use the filepath as an uri
  app.use(val.uri, val.router);
  // Set the index files as landing page for the folder routes and its subfolders
  if( val.uri.split('/')[ val.uri.split('/').length-1 ] === 'index' ){
    uri = val.uri.split('/');
    uri.pop();
    uri = uri.join('/');
    app.use(uri, val.router);
  }
});


function buildPackages(pathDir, packages){

  if(!packages){
    var packages = [];
  }

  // Get the list of routes files
  fs.readdirSync(pathDir).forEach(function(fileName) {

    var packageName = path.resolve(pathDir, fileName).replace(__dirname + '/packages/', '').split('/')[0];
    var insideThePackageRootesFolder = ( path.resolve(pathDir, fileName).replace(__dirname + '/packages/', '').split('/')[1] == 'routes' );

    // Have a package name && inside the package rooutes folder
    if( packageName && insideThePackageRootesFolder ){

      if( fs.statSync(path.resolve(pathDir, fileName)).isFile() ){

        // Filter *.js
        if( fileName.split('.')[ fileName.split('.').length-1 ] === 'js' ){

          uri = path.resolve(pathDir, fileName);
          uri = uri.replace(path.resolve(__dirname, 'packages'), '').split('.');
          uri.pop();
          uri = uri.join();

          // the routes folder name from the uri
          uri = '/' + packageName + uri.substring(('/' + packageName + '/routes').length, uri.length);

          tmp = {
            'filePath': path.resolve(pathDir, fileName),
            'uri': uri,
            'router': require(path.resolve(pathDir, fileName)),
          };

          packages.push(tmp);

        }
        
      }
      
    }

    if( fs.statSync(path.resolve(pathDir, fileName)).isDirectory() ){

      var folderPath = path.resolve(pathDir, fileName).replace(__dirname + '/packages/', '').split('/');

      // Explore the packages root and subfolder named routes
      if( !folderPath[1] || folderPath[1] == 'routes' ){
        buildPackages(path.resolve(pathDir, fileName), packages);
      }
      
    }

  });

  return packages;

}

var packages = buildPackages(path.resolve(__dirname, 'packages'));

packages.forEach(function(val, key){

  // add packages routes to routes
  routes.push(val);

  // Use the filepath as an uri
  app.use(val.uri, val.router);
  // Set the index files as landing page for the folder routes and its subfolders
  if( val.uri.split('/')[ val.uri.split('/').length-1 ] === 'index' ){
    uri = val.uri.split('/');
    uri.pop();
    uri = uri.join('/');
    app.use(uri, val.router);
  }
});

// add routes to the shared object
appGlobal.routes = routes;

// share app object with all express routers
// so later it can be available using using
// req.app.get('app').something
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
