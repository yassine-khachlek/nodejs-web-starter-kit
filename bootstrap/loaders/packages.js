/**
  Autoload packages
*/

var events = require('events');
var path = require('path');
var fs = require('fs');


function routesBuilder(packageInfo, routesPath, currentPath, routes){

  currentPath = currentPath || routesPath;
  routes = routes || {};

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
          'uri': '/' + packageInfo.vendor + '/' + packageInfo.name + uri,
          'router': require(path.resolve(currentPath, fileName)),
        };

        routes[ tmp.filePath ] = tmp;

      }
      
    }

    if( fs.statSync(path.resolve(currentPath, fileName)).isDirectory() ){
      routesBuilder(packageInfo, routesPath, path.resolve(currentPath, fileName), routes);
    }

  });

  return routes;

}


function Packages(packagesPath) {
  this.packagesPath = packagesPath;
  this.packages = {};
}

Packages.prototype.getPackages = function() {
  
  var packagesEvents  = this;
  var packagesPath    = this.packagesPath;
  var packages        = this.packages;

  // Read the packages directory
  fs.readdir(packagesPath, function(err, vendors){

    if( err ){
      // Emit the received error from readdir
      return packagesEvents.emit('done', err);
    }

    // Loop through vendor directories
    vendors.forEach(function(vendorName, vendorIndex){

      // Read the vendor directory
      fs.readdir(path.resolve(packagesPath, vendorName), function(err, packagesName){

        packagesName.forEach(function(packageName, packageIndex){

          var packageObj = {
              vendor: vendorName,
              name: packageName,
              routes: {},
              extendsRoutes: {}
          }

          packageObj.routes = routesBuilder(packageObj, path.resolve(packagesPath, vendorName, packageName, 'routes'));

          // add extendsRoutes if found
          if (fs.existsSync(path.resolve(packagesPath, vendorName, packageName, 'extendsRoutes.json'))) {
            packageObj.extendsRoutes =  JSON.parse(fs.readFileSync(path.resolve(packagesPath, vendorName, packageName, 'extendsRoutes.json')).toString());
          }

          Object.keys(packageObj.extendsRoutes).forEach(function(val, index){

            tmp = {
              'filePath': path.resolve(packagesPath, vendorName, packageName, 'routes', packageObj.extendsRoutes[val].filePath),
              'uri': packageObj.extendsRoutes[val].uri,
              'templateUrl': packageObj.extendsRoutes[val].templateUrl,
              'router': require(path.resolve(packagesPath, vendorName, packageName, 'routes', packageObj.extendsRoutes[val].filePath)),
            };

            packageObj.routes[ vendorName + '/' + packageName + '/' + val ] = tmp;

          });

          packages[packageObj.vendor + '/' + packageObj.name] = packageObj;

          if (((vendors.length - 1) === vendorIndex) && ((packagesName.length - 1) === packageIndex)) {
            // Done
            packagesEvents.emit('done', err, packages);
          }

        });

      })

    })

  })

};

Packages.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (packagesPath) {
    return new Packages(packagesPath);    
}
