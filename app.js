var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var mongoose = require('mongoose');
var mongooseSchema = mongoose.Schema;

// shared object with all express routes
var appGlobal = {};

appGlobal.base = '/';

appGlobal.config = {};

if( !process.env.NODE_ENV ){
  process.env.NODE_ENV = 'default';
}

// Load auth configuration
var authConfig = JSON.parse( fs.readFileSync( path.resolve(__dirname, 'config', process.env.NODE_ENV, 'auth.json') ).toString() );

// Load the database configuration
var databaseConfig = JSON.parse( fs.readFileSync( path.resolve(__dirname, 'config', process.env.NODE_ENV, 'database.json') ).toString() );

// Load database Schema
var databaseSchema = JSON.parse( fs.readFileSync( path.resolve(__dirname, 'config', process.env.NODE_ENV, 'databaseSchema.json') ).toString() );

appGlobal.config.database       = databaseConfig;
appGlobal.config.databaseSchema = databaseSchema;

var mongooseConnectionUri = 'mongodb://'+databaseConfig.connections[databaseConfig.default].host+':'+databaseConfig.connections[databaseConfig.default].port+'/'+databaseConfig.connections[databaseConfig.default].database;
var mongooseConnectionOptions = databaseConfig.connections[databaseConfig.default].connectionOptions;
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

appGlobal.database = {};

Object.keys(databaseSchema).forEach(function(collection, index){
  
  appGlobal.database.default = {};
  appGlobal.database.default[collection] = {};
  appGlobal.database.default[collection].schema = new mongooseSchema(databaseSchema[collection].schema, databaseSchema[collection].schemaOptions);
  appGlobal.database.default[collection].model = mongoose.model(collection, databaseSchema[collection].schema);

});

// shared db over the process var until i found another clean solution!
// THIS IS SCRIPT WHERE SHOULD USE IT OUTSIDE THE EXPRESS ROUTER
process.database = appGlobal.database;
process.auth = authConfig;

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;

var session = require('express-session');
var flash = require('connect-flash');

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
    uri = uri.join('/') + '/';
    app.use(uri, val.router);
    
    // add the new route to routes
    // very important for angular
    var tmp = {
      'filePath': val.filePath,
      'uri': uri,
      'router': val.router,
    };

    routes.push(tmp);

  }
});


function buildPackages(pathDir, packages){

  if(!packages){
    var packages = [];
  }

  // Get the list of routes files
  fs.readdirSync(pathDir).forEach(function(fileName) {

    var packageVendor = path.resolve(pathDir, fileName).replace(__dirname + '/packages/', '').split('/')[0];
    var packageName = path.resolve(pathDir, fileName).replace(__dirname + '/packages/', '').split('/')[1];
    
    var insideThePackageRootesFolder = ( path.resolve(pathDir, fileName).replace(__dirname + '/packages/', '').split('/')[2] == 'routes' );

    // Have a package name && inside the package rooutes folder
    if( packageVendor && packageName && insideThePackageRootesFolder ){

      if( fs.statSync(path.resolve(pathDir, fileName)).isFile() ){

        // Filter *.js
        if( fileName.split('.')[ fileName.split('.').length-1 ] === 'js' ){

          uri = path.resolve(pathDir, fileName);
          uri = uri.replace(path.resolve(__dirname, 'packages'), '').split('.');
          uri.pop();
          uri = uri.join();

          // the routes folder name from the uri
          uri = '/' + packageVendor + '/' + packageName + uri.substring(('/' + packageVendor + '/' + packageName + '/routes').length, uri.length);
          //uri = '/' + packageName + uri.substring(('/' + packageName + '/routes').length, uri.length);

          tmp = {
            'filePath': path.resolve(pathDir, fileName),
            'uri': uri,
            'router': require(path.resolve(pathDir, fileName)),
          };

          packages.push(tmp);

          // Extends routes
          var extendsRoutesFilePath = path.resolve(__dirname, 'packages', packageVendor, packageName, 'extendsRoutes.json');
          
          if( fs.existsSync(extendsRoutesFilePath) ){
            
            var extendsRoutes = JSON.parse( fs.readFileSync( extendsRoutesFilePath ).toString() );
            
            extendsRoutes.forEach(function(val, index){

              tmp = {
                'filePath': val.filePath,
                'uri': val.uri,
                'templateUrl': val.templateUrl,
                'router': require(val.filePath),
              };

              packages.push(tmp);

            });

          }

        }
        
      }
      
    }

    if( fs.statSync(path.resolve(pathDir, fileName)).isDirectory() ){

      var folderPath = path.resolve(pathDir, fileName).replace(__dirname + '/packages/', '').split('/');

      // Explore the packages root and subfolder named routes
      if( !folderPath[2] || folderPath[2] == 'routes' ){
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

    // add the new route to routes
    // very important for angular
    var tmp = {
      'filePath': val.filePath,
      'uri': uri,
      'router': val.router,
    };

    routes.push(tmp);

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


module.exports = app;
