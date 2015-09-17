var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('routes', { 
    title: 'Express',
    routes: req.app.get('app').routes,
    reqUser: req.user,
    reqFlashSuccess: req.flash('success'),
  });

});

module.exports = router;