var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {

  var userModel = req.app.get('app').database.default.users.model;

  var query = userModel.find();

  // execute the query at a later time
  query.exec(function (err, users) {
    
    //if (err) return next(err);
    if (err) {

      var err = new Error("Database error.");

      res.render('error', { 
        base: req.app.get('app').base,
        xhr: req.xhr,
        title: 'Express',
        routes: req.app.get('app').routes,
        error: err
      });       

    }

    res.render(path.resolve(__dirname, '../views/index'), { 
      base: req.app.get('app').base,
      xhr: req.xhr,	  
      title: 'Express',
      routes: req.app.get('app').routes,
      reqUser: req.user,
      reqFlashSuccess: req.flash('success'),
      users: users
    });

  })

});

module.exports = router;
