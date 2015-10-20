/**
  Autoload config
*/

var events = require('events');
var path = require('path');
var fs = require('fs');

function Config(configPath, configEnv) {
  this.configPath = configPath;
  this.configEnv  = configEnv;
  this.config = {};
}

Config.prototype.getConfig = function() {
  
  var configEvent  = this;
  
  var configPath    = this.configPath;
  var configEnv     = this.configEnv;
  
  var config        = this.config;

  var validFilesCount    = 0;

  // Read the config directory
  fs.readdir(path.resolve(configPath, configEnv), function(err, files){

    if( err ){
      // Emit the received error from readdir
      return configEvent.emit('done', err);
    }

    // Loop through files
    files.forEach(function(file, fileIndex){

      // Get the file extension
      var extension = file.split('.')[ file.split('.').length-1 ];

      // Verify if file is a json by extension
      if( extension === 'json' ){

        // Counter for the json files found
        validFilesCount++;

        // Read the file content
        fs.readFile(path.resolve(configPath, configEnv, file), function (err, data) {
      
          if( err ){
            // Emit the received error from readFile
            return configEvent.emit('done', err);

          }else{

            // Get the filename without extension
            var filename = file.split('.');
            filename.pop();
            filename = filename.join();

            // Transform the file content from buffer to string to object
            // and assign it to the config object with filename as a key
            config[filename] = JSON.parse(data.toString());

            if (validFilesCount === Object.keys(config).length) {
              
              // Load and merge package config
              Object.keys(config.app.providers).forEach(function(val, index){

                var packageConfigPath = path.resolve('packages', config.app.providers[val], 'config', configEnv);

                try {
                  fs.readdirSync(packageConfigPath).forEach(function(val, index){

                    var filename = val.split('.');
                    filename.pop();
                    filename = filename.join();                    

                    var packageConfigObj = JSON.parse(fs.readFileSync(path.resolve(packageConfigPath, val)).toString());
                    
                    Object.keys(packageConfigObj).forEach(function(val, index){
                      config[filename][val] = packageConfigObj[val];
                    });

                  });
                } catch (e) {
                  //console.log(e);
                }

              });

              // Done
              configEvent.emit('done', null, config);
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



