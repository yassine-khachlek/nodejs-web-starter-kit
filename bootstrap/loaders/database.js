/**
  Autoload database
*/

var events = require('events');
var path = require('path');
var fs = require('fs');

function Database(databaseConfig, databaseSchema, mongoose) {
  this.databaseConfig  = databaseConfig;
  this.databaseSchema  = databaseSchema;
  this.mongoose        = mongoose;
  this.mongooseSchema  = mongoose.Schema;
  this.database = {};
}

Database.prototype.getDatabase = function() {

  var databaseEvents  = this;
  var databaseConfig = this.databaseConfig;
  var databaseSchema = this.databaseSchema;
  var database       = this.database;

  var mongoose       = this.mongoose;
  var mongooseSchema = this.mongooseSchema;

  var mongooseConnectionUri = 'mongodb://'+databaseConfig.connections[databaseConfig.default].host+':'+databaseConfig.connections[databaseConfig.default].port+'/'+databaseConfig.connections[databaseConfig.default].database;
  var mongooseConnectionOptions = databaseConfig.connections[databaseConfig.default].connectionOptions;

  if( !mongooseConnectionOptions.user ){
    delete mongooseConnectionOptions.user;
  }

  if( mongooseConnectionOptions.pass ){
    delete mongooseConnectionOptions.pass;
  }

  var mongooseConnection = {};

  database.default = {};

  Object.keys(databaseSchema).forEach(function(collection, index){
    database.default[collection] = {};
    database.default[collection].schema = new mongooseSchema(databaseSchema[collection].schema, databaseSchema[collection].schemaOptions);
    database.default[collection].model  = mongoose.model(collection, databaseSchema[collection].schema);
  });

  var mongooseConnectWithRetry = function() {
    mongooseConnection = mongoose.connect(mongooseConnectionUri, mongooseConnectionOptions, function(err){
      // if (err) throw err;
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(mongooseConnectWithRetry, 5000);
      }else{
        databaseEvents.emit('done', null, database);
        console.error('Connected to mongodb.');
      }
    });
  };
  
  mongooseConnectWithRetry();
  

};

Database.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (databaseConfig, databaseSchema, mongoose, mongooseSchema) {
    return new Database(databaseConfig, databaseSchema, mongoose, mongooseSchema);    
}



