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
    if (err && postId === false) {

      var err = new Error("You attempted to edit an item that doesn’t exist. Perhaps it was deleted?");

      res.render('error', { 
        base: req.app.get('app').base,
        xhr: req.xhr,
        title: 'Express',
        routes: req.app.get('app').routes,
        error: err
      });       

    }

    var updateError    = req.flash('updateError');
    var updateSuccess  = req.flash('updateSuccess')

    var updateErrorXhr    = req.flash('updateErrorXhr');
    var updateSuccessXhr  = req.flash('updateSuccessXhr')

    if( updateError.length > 0 && updateErrorXhr.length <= 0 ){
      req.flash('updateErrorXhr', updateError);
    }

    if( updateSuccess.length > 0 && updateSuccessXhr.length <= 0 ){
      req.flash('updateSuccessXhr', updateSuccess);
    }

    res.render(path.resolve(__dirname, '../views/index'), { 
      base: req.app.get('app').base,
      xhr: req.xhr,
      title: '',
      routes: req.app.get('app').routes,
      reqUser: req.user,
      postUpdateError: updateError, 
      postUpdateSuccess: updateSuccess,
      postUpdateErrorXhr: updateErrorXhr, 
      postUpdateSuccessXhr: updateSuccessXhr,      
      reqUser: req.user,
      post: post,
      section: 'update'
    });

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
    
    var err = new Error("You attempted to edit an item that doesn’t exist. Perhaps it was deleted?");

    res.render('error', { 
      base: req.app.get('app').base,
      xhr: req.xhr,
      title: '',
      routes: req.app.get('app').routes,
      error: err
    }); 

  }else{

    var postModel = req.app.get('app').database.default.blogs.model;

    // Search and update existing post
    var postFound = postModel.findOne({_id: postId});

    postFound.exec(function (err, post) {
      
      //if (err) return next(err);
      if (err) {

        var err = new Error("An error occurred, unable to update the post.");

        res.render('error', { 
          base: req.app.get('app').base,
          xhr: req.xhr,
          title: '',
          routes: req.app.get('app').routes,
          error: err
        });       

      }else{

        if (req.body && req.body.title && req.body.content) {

          post.title = req.body.title;
          post.content = req.body.content;
          
          if(req.body.published === 'true'){
            post.published = req.body.published;  
          }else{
            post.published = false;
          }

          postFound.update(post, function (err, postUpdated) {
            
            if(err){
              // Set flash error message
              req.flash('updateError', err)
            }else{
              // Set flash success message
              req.flash('updateSuccess', 'Post updated.')
            }

            // redirect
            res.redirect('./'+post.id);

          });

        }else{

          req.flash('updateError', 'Missing required field(s).')

          res.redirect('./'+post.id);           

        }

      }

    })

  }

});

module.exports = router;
