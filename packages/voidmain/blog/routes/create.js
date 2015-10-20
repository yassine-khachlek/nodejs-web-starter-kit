var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
 
  if (!req.user) {
    return res.redirect('..');
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
    section: 'create'
  });

});

router.post('/', function(req, res, next) {

    if (!req.user) {
      return res.redirect('..');
    }

    if (req.body && req.body.title && req.body.content) {

      var postModel = req.app.get('app').database.default.blogs.model;

      var newPost = new postModel(req.body);

      newPost.save(function (err) {

        if(err){
          // Set flash error message
          req.flash('updateError', err)
        }else{
          // Set flash success message
          req.flash('updateSuccess', 'Post updated.')
        }

        if (err) {

          res.redirect('./create');

        }else{

          res.redirect('./update/'+newPost._id);

        }

      });

    }else{

      req.flash('updateError', 'Missing required field(s).')

      res.redirect('./create');      

    }

});

module.exports = router;
