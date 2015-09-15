var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('about', { 
  	title: 'Express',
  	routes: req.app.get('app').routes,
  	reqUser: req.user
  });
});

module.exports = router;
