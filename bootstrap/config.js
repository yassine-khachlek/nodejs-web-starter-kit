var events = require('events');
var path = require('path');
var fs = require('fs');

/**
Constructor
*/
function Config(configPath, configEnv) {
  this.configPath = configPath;
  this.configEnv  = configEnv;
  this.config = {};
}

Config.prototype.getConfig = function() {
  
  var configEvents  = this;
  
  var configPath    = this.configPath;
  var configEnv     = this.configEnv;
  
  var config        = this.config;

  var validFilesCount    = 0;

  fs.readdir(path.resolve(configPath, configEnv), function(err, files){

    if( err ){
      return configEvents.emit('done', err);
    }

    files.forEach(function(file, fileIndex){

      var extension = file.split('.')[ file.split('.').length-1 ];

      if( extension === 'json' ){

        validFilesCount++;

        fs.readFile(path.resolve(configPath, configEnv, file), function (err, data) {
      
          if( err ){

            return configEvents.emit('done', err);

          }else{

            var filename = file.split('.');
            filename.pop();
            filename = filename.join();

            config[filename] = JSON.parse(data.toString());

            if (validFilesCount === Object.keys(config).length) {
                configEvents.emit('done', err, config);
            }

          }

        });

      }

    });

  })

};

Config.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (configPath, configEnv) {
    return new Config(configPath, configEnv);    
}



