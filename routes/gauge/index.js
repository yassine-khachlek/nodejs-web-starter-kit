var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {

  res.render('gauge/index', { 
  	title: 'Express',
  	routes: req.app.get('app').routes,
  	reqUser: req.user,
  });

});

module.exports = router;
