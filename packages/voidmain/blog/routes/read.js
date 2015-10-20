var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res, next) {

  if( !req || !req.params || !req.params[0] || !req.params[0].split('/')[0] ){
      
      var err = new Error("Not Found, The post_id is missing.");

      res.render('error', { 
        base: req.app.get('app').base,
        xhr: req.xhr,
        title: 'Express',
        routes: req.app.get('app').routes,
        error: err
      });

  }else{

    var params = req.params[0].split('/');

    var blogModel = req.app.get('app').database.default.blogs.model;

    var query = blogModel.findOne({_id: params[0]});

    // execute the query at a later time
    query.exec(function (err, post) {
      
      //if (err) return next(err);
      if (err) {

        var err = new Error("Post not Found.");

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
        title: '',
        routes: req.app.get('app').routes,
        reqUser: req.user,
        reqFlashSuccess: req.flash('success'),
        reqUser: req.user,
        post: post,
        section: 'read'
      });

    })

  }

});

module.exports = router;
