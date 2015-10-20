var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {

  var blogModel = req.app.get('app').database.default.blogs.model;

  if ( !req.user ) {

    var query = blogModel.find().
    where('published').equals(true);

  }else{

    var query = blogModel.find();

  }

  // execute the query at a later time
  query.exec(function (err, posts) {
    
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

    }else{

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
        title: 'Express',
        routes: req.app.get('app').routes,
        reqUser: req.user,
        postUpdateError: updateError, 
        postUpdateSuccess: updateSuccess,
        postUpdateErrorXhr: updateErrorXhr, 
        postUpdateSuccessXhr: updateSuccessXhr,  
        posts: posts,
        section: 'list'
      });

    }

  })

});

module.exports = router;
