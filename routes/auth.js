var express = require('express');
var router = express.Router();
var config = require('config');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: config.get('authentication.passport.strategy.facebook.clientID'),
    clientSecret: config.get('authentication.passport.strategy.facebook.clientSecret'),
    callbackURL: config.get('authentication.passport.strategy.facebook.callbackURL')
  },
  function(accessToken, refreshToken, profile, done) {
    /*
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
    */
    done(null, profile)
  }
));

router.get('/', function(req, res, next) {
  res.render('auth', { 
    title: 'Express',
    routes: req.app.get('app').routes,
    session: req.session
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Express',
    routes: req.app.get('app').routes,
    session: req.session
  });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/facebook',
    passport.authenticate('facebook', {session: true, scope : ['email']})
);

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',

    passport.authenticate('facebook', {session: true, successRedirect: '/', failureRedirect: '/login'})
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