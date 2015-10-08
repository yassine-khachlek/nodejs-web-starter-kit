var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {


  var userModel = req.app.get('app').database.default.users.model;

  var query = userModel.find();

  // execute the query at a later time
  query.exec(function (err, users) {
    if (err) return handleError(err);

    res.render(path.resolve(__dirname, '../views/index'), { 
	  title: 'Express',
	  routes: req.app.get('app').routes,
	  reqUser: req.user,
      reqFlashSuccess: req.flash('success'),
      users: users
    });

  })

});

module.exports = router;
