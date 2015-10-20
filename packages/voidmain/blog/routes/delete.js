var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res, next) {

  if (!req.user) {
    return res.redirect('..');
  }

  var postId = false;

  if( req && req.params && req.params[0] && req.params[0].split('/')[0] ){
    postId = req.params[0].split('/')[0];
  }

  var blogPost = req.app.get('app').database.default.blogs.model;

  var query = blogPost.findOne({_id: postId});

  query.exec(function (err, post) {
    
    //if (err) return next(err);
    if (err && postId !== false) {

      var err = new Error("You attempted to delete an item that doesn’t exist. Perhaps it was deleted?");

      res.render('error', { 
        base: req.app.get('app').base,
        xhr: req.xhr,
        title: 'Express',
        routes: req.app.get('app').routes,
        error: err
      });       

    }else{

      res.render(path.resolve(__dirname, '../views/index'), { 
        base: req.app.get('app').base,
        xhr: req.xhr,
        title: '',
        routes: req.app.get('app').routes,
        reqUser: req.user,
        post: post,
        section: 'delete'
      });

    }

  })  

});

router.post('/*', function(req, res, next) {

  if (!req.user) {
    return res.redirect('..');
  }

  var postId = false;

  if( req && req.params && req.params[0] && req.params[0].split('/')[0] ){
    postId = req.params[0].split('/')[0];
  }

  if ( !postId ) {
    
    var err = new Error("You attempted to delete an item that doesn’t exist. Perhaps it was deleted?");

    res.render('error', { 
      base: req.app.get('app').base,
      xhr: req.xhr,
      title: '',
      routes: req.app.get('app').routes,
      error: err
    }); 

  }else{

    var postModel = req.app.get('app').database.default.blogs.model;

    var query = postModel.remove({_id: postId}, function(err) {
      
      if (err) {

        res.render('error', { 
          base: req.app.get('app').base,
          xhr: req.xhr,
          title: 'Express',
          routes: req.app.get('app').routes,
          error: err
        });

      }else {

        req.flash('updateSuccess', 'Post deleted.');

        res.redirect('..');

      }

    });

  }

});

module.exports = router;
