var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {

  res.render(path.resolve(__dirname, '../views/index'), { 
	base: req.app.get('app').base,
	xhr: req.xhr,
  	title: 'Express',
  	routes: req.app.get('app').routes,
  });

});

module.exports = router;
