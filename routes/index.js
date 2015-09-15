var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Express',
  	routes: req.app.get('app').routes,
  	session: req.session
  });
});

module.exports = router;
