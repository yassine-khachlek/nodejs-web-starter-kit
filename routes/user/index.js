var express = require('express');
var router = express.Router();

/*
  The /* routes will not work because 
  it's not included in angular routes
  Need to found another way to do that
*/

router.get('/', function(req, res, next) {
/*
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
*/

  if (req.user) {

    // When user is logged in
    res.render('user', { 
      base: req.app.get('app').base,
      xhr: req.xhr,
      title: 'Express',
      routes: req.app.get('app').routes,
      reqUser: req.user,
      reqSession: req.session
    });  

  }else{
    // If not logged in
    var err = new Error("You do not have sufficient permissions to access this page.");

    res.render('error', { 
      base: req.app.get('app').base,
      xhr: req.xhr,
      title: 'Express',
      routes: req.app.get('app').routes,
      error: err
    }); 

  }

//  });

});

module.exports = router;