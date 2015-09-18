var express = require('express');
var router = express.Router();
var config = require('config');

var collections = [];

Object.keys(config.get('databases.leveldb.collections')).forEach(function(collection, index){
  
  collections.push({
    name: collection,
    displayName: config.get('databases.leveldb.collections.' + collection).displayName,
  });

});

router.get('/', function(req, res, next) {

  var db = req.app.get('app').db.users;

  res.render('database', { 
    title: 'Express',
    routes: req.app.get('app').routes,
    reqUser: req.user,
    reqFlashSuccess: req.flash('success'),
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

  var collectionName = params[0];

  var db = req.app.get('app').db[collectionName];

  console.log(db);
  var datas = [];

  db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: false})
    .on('data', function (data) {
      //delete data.value.local.password;
      datas.push(data.value);
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
  	    datas: datas,
        collections: collections,
  	  });

    })

});

module.exports = router;
