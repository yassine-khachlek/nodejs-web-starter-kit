/**
  Autoload routes
*/

var events = require('events');
var path = require('path');
var fs = require('fs');

function Routes(routesPath) {
  this.routesPath = routesPath;
  this.routes = [];
}

function routesBuilder(routesPath, currentPath, routes){

    currentPath = currentPath || routesPath;
    routes = routes || [];

	// Get the list of routes files
	fs.readdirSync(currentPath).forEach(function(fileName) {
	  
	  if( fs.statSync(path.resolve(currentPath, fileName)).isFile() ){

	    // Filter *.js
	    if( fileName.split('.')[ fileName.split('.').length-1 ] === 'js' ){

	      uri = path.resolve(currentPath, fileName);
	      uri = uri.replace(routesPath, '').split('.');
	      uri.pop();
	      uri = uri.join();

	      tmp = {
	        'filePath': path.resolve(currentPath, fileName),
	        'uri': uri,
	        'router': require(path.resolve(currentPath, fileName)),
	      };

	      routes.push(tmp);

	    }
	    
	  }

	  if( fs.statSync(path.resolve(currentPath, fileName)).isDirectory() ){
	    routesBuilder(routesPath, path.resolve(currentPath, fileName), routes);
	  }

	});

	return routes;

}



Routes.prototype.getRoutes = function(routesPath) {
  
  var RoutesEvent	= this;
  var routes 	    = this.routes;

  var routes = routesBuilder(this.routesPath);

  // Done
  RoutesEvent.emit('done', null, routes);

};

Routes.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (routesPath) {
    return new Routes(routesPath);    
}



