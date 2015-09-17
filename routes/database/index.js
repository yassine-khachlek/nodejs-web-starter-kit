var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  var db = req.app.get('app').db.users;
  var users = [];

  var collections = [
    {
      name: 'user',
      displayName: 'Users',
    }
  ];

  res.render('database', { 
    title: 'Express',
    routes: req.app.get('app').routes,
    reqUser: req.user,
    reqFlashSuccess: req.flash('success'),
    users: users,
    collections: collections,
  });

});

router.get('/*', function(req, res, next) {

  if( !req.params[0] ){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);    
    return
  }

  var params = req.params[0].split('/');

  if(!params[0]){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);    
    return
  }

  var collectionName = params[1];

  var db = req.app.get('app').db.users;
  var users = [];

  var collections = [
    {
      name: 'user',
      displayName: 'Users',
    }
  ];

  db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: false})
    .on('data', function (data) {
      delete data.value.local.password;
      users.push(data.value);
    })
    .on('error', function (err) {
      console.log(err)
    })
    .on('close', function () {
    })
    .on('end', function () {

  	  res.render('database', { 
  	    title: 'Express',
  	    routes: req.app.get('app').routes,
  	    reqUser: req.user,
  	    reqFlashSuccess: req.flash('success'),
  	    users: users,
        collections: collections,
  	  });

    })

});

module.exports = router;
