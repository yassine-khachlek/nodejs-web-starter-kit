var events = require('events');
var path = require('path');
var fs = require('fs');

function Autoload(options) {

  Object.keys(options).forEach(function(optionValue, optionIndex){
    this[optionValue] = options[optionValue];
  });

  this.mongoose = options.mongoose;

  this.config   = require('./config')(options.configPath, options.env);
  this.packages = require('./packages')(options.packagesPath, options.env);

  this.appConfig = {
    "base": "/",
    "config": {},
    "database": {},
    "packages": [],
  };

}

Autoload.prototype.getConfig = function() {
  
  var AutoloadEvents  = this;

  var config      = this.config;
  var packages    = this.packages;

  var mongoose        = this.mongoose;

  var appConfig   = this.appConfig;

  config.on('done', function(err, configData){
    
    if( err ){
      return AutoloadEvents.emit('done', err);
    }

    appConfig.config = configData;

    var database = require('./database')(appConfig.config.database, appConfig.config.databaseSchema, mongoose);

    database.on('done', function(err, databaseData){
      
      if( err ){
        return AutoloadEvents.emit('done', err);
      }

      appConfig.database = databaseData;


      packages.on('done', function(err, packagesData){
        
        if( err ){
          return AutoloadEvents.emit('done', err);
        }

        appConfig.packages = packagesData;

        AutoloadEvents.emit('done', null, appConfig);

      });

      packages.getPackages();


    });

    database.getDatabase();    

  });

  config.getConfig();

  

};

Autoload.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (options) {
    return new Autoload(options);
}



