var express = require('express');
var router = express.Router();

var ObjectId = require('../../../libs/ObjectId.js');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

// handle the callback after facebook has authenticated the user
router.get('/',

    passport.authenticate('facebook', { session: true,
                                        successRedirect: '/',
                                        failureRedirect: '/login',
                                        successFlash: 'Welcome!',
                                        failureFlash: 'Invalid username or password.'
                                      })
    /**
    Success and failure override functions
    ,
    // on succes
    function(req,res) {
        // return the token or you would wish otherwise give eg. a succes message
        //res.render('json', {data: JSON.stringify(req.user.access_token)});
        res.render('error', {message: "success message: " + JSON.stringify(req.user)});
    },
    
    // on error; likely to be something FacebookTokenError token invalid or already used token,
    // these errors occur when the user logs in twice with the same token
    function(err,req,res,next) {
        // You could put your own behavior in here, fx: you could force auth again...
        // res.redirect('/auth/facebook/');
        if(err) {
            res.status(400);
            res.render('error', {message: "error message: " + err.message});
        }
    }
    */
);

module.exports = router;