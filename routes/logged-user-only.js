var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {


  if (req.user) {
    // When user is logged in
	  res.render('logged-user-only', { 
	  	title: 'Express',
	  	routes: req.app.get('app').routes,
	  	reqUser: req.user,
	  	reqSession: req.session
	  });
  }else{
    // If not logged in
    var err = new Error("You do not have sufficient permissions to access this page.");
    res.render('error', {
      message: err.message,
      //error: err
    });
  }

});

module.exports = router;
