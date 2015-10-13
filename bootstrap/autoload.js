/**
  Autoload config, packages, database, ...
*/

var events = require('events');
var path = require('path');
var fs = require('fs');

function Autoload(options) {

  Object.keys(options).forEach(function(optionValue, optionIndex){
    this[optionValue] = options[optionValue];
  });

  // Fix for the previous lines, the mongoose variabe is not set!
  this.mongoose = options.mongoose;
  this.routesPath = options.routesPath;
  this.packagesPath = options.packagesPath;

  this.configLoader   = require('./loaders/config')(options.configPath, options.env);
  this.packagesLoader = require('./loaders/packages')(options.packagesPath, options.env);  

  // Object will contain every autoloaded things
  this.appConfig = {
    "base": "/",
    "config": {},
    "database": {},
    "routes": [],
    "packages": [],
  };

}

Autoload.prototype.getConfig = function() {
  
  // Class event emitter
  var AutoloadEvent = this;

  // Config loader
  var configLoader  = this.configLoader;
  // Packages loader
  var packagesLoader= this.packagesLoader;

  var routesPath    = this.routesPath;

  var packagesPath = this.packagesPath;

  // Mongoose instance
  var mongoose    = this.mongoose;

  // Object to populate with loaded things
  var appConfig   = this.appConfig;

  configLoader.on('done', function(err, configData){
    
    if( err ){
      // Emit the received error from the config loader
      return AutoloadEvent.emit('done', err);
    }

    appConfig.config = configData;

    // Database loader
    // Load it here, because it need configuration first
    var databaseLoader = require('./loaders/database')(appConfig.config.database, appConfig.config.databaseSchema, mongoose);

    databaseLoader.on('done', function(err, databaseData){
      
      if( err ){
        // Emit the received error from the database loader
        return AutoloadEvent.emit('done', err);
      }

      appConfig.database = databaseData;

      //Should be set before loading routes
      process.app.database = appConfig.database;
      process.app.auth = appConfig.config.auth;

      packagesLoader.on('done', function(err, packagesData){
        
        if( err ){
          // Emit the received error from the packages loader
          return AutoloadEvent.emit('done', err);
        }

        appConfig.packages = packagesData;

        var routesLoader = require('./loaders/routes')(routesPath);

        routesLoader.on('done', function(err, routesData){

          if( err ){
            // Emit the received error from the routes loader
            return AutoloadEvent.emit('done', err);
          }

          appConfig.routes = appConfig.routes.concat(routesData);

          // Load routes packages
          packagesData.forEach(function(val , index){
            appConfig.routes = appConfig.routes.concat(val.routes);
          })

          // done
          AutoloadEvent.emit('done', null, appConfig);

        })

        routesLoader.getRoutes();

      });

      packagesLoader.getPackages();


    });

    databaseLoader.getDatabase();    

  });

  configLoader.getConfig();

};

Autoload.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (options) {
    return new Autoload(options);
}



