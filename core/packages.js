var events = require('events');
var path = require('path');
var fs = require('fs');

/**
Constructor
*/
function Packages(packagesPath) {
  this.packagesPath = packagesPath;
  this.packages = [];
}

Packages.prototype.getPackages = function() {
  
  var packagesEvents  = this;
  var packages        = this.packages;
  var packagesPath    = this.packagesPath;

  fs.readdir(packagesPath, function(err, vendors){

    if( err ){
      return packagesEvents.emit('done', err);
    }

    vendors.forEach(function(vendorName, vendorIndex){

      fs.readdir(path.resolve(packagesPath, vendorName), function(err, packagesName){

        packagesName.forEach(function(packageName, packageIndex){

            var packageObj = {
                vendor: vendorName,
                name: packageName
            }
            
            packages.push(packageObj);

            if (((vendors.length - 1) === vendorIndex) && ((packagesName.length - 1) === packageIndex)) {
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



