var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
  res.render(path.resolve(__dirname, '../views/index'), { 
  	title: 'Express',
  	routes: req.app.get('app').routes,
  	reqUser: req.user,
    reqFlashSuccess: req.flash('success'),   	
  });
});

module.exports = router;
