var express = require('express');
var router = express.Router();

router.get('/*', function(req, res, next) {

  if( !req.params[0] ){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);    
    return
  }

  var params = req.params[0].split('/');

  if(!(params.length >= 2 && params[0] == 'id')){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);    
    return
  }

  var userId = params[1];

  var User = req.app.get('app').database.default.users.model;

  User.findById(userId, function(err, user) {
    
    if (err) {

      if (err.notFound) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);   
        return
      }
      // I/O or other error, pass it up the callback chain
      //return callback(err)
      var err = new Error(err);
      err.status = 404;
      next(err);   
      return
      
    }

    if( user && user.local ){
      delete user.local.password;
    }
    

    // .. handle `value` here
    res.render('user', { 
      title: 'Express',
      routes: req.app.get('app').routes,
      reqUser: req.user,
      reqFlashSuccess: req.flash('success'),
      user: user,     
    });

  });

});

module.exports = router;