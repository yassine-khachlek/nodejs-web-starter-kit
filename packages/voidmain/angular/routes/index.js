var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {

  /*
  var xhr = false;
  if( req.headers["x-requested-with"] == 'XMLHttpRequest' ){
  	xhr = true;
  }
  */

  res.setHeader('content-type', 'application/javascript');

  res.render(
  	path.join(path.resolve(__dirname, '../views/index')), 
    {
      base: req.app.get('app').base,
      xhr: req.xhr,
      title: '',
      // Provide routes to the views, for generating angular routes
      routes: req.app.get('app').routes,
    }
  );
  
});

module.exports = router;
