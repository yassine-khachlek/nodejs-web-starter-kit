var express = require('express');
var router = express.Router();
var config = require('config');

var levelup = require('level')
var db = levelup('./database/user')

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log(username, password);
    /*
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
    */
    User = false;
    db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: false})
      .on('data', function (data) {
        console.log(data.key, '=', data.value);
        if( data.value.username == username && data.value.password == password ){
          User = data.value;
        }
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
      })
      .on('close', function () {
        console.log('Stream closed');
      })
      .on('end', function () {
        console.log('Stream end');
        if( !User ){
          return done(null, false, { message: 'Invalid username or password.' });
        }
        return done(null, User);
      })
  }
));

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
    reqUser: req.user
  });
});

router.get('/login', function(req, res, next) {
  if (req.user) {
    // Redirect when user is logged in
    res.redirect('/');
  }else{
    // If not logged in, show the login form
    res.render('login', { 
      title: 'Express',
      routes: req.app.get('app').routes,
      reqUser: req.user,
      reqFlashError: req.flash('error'), 
    });
  }
});

/*
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
});
*/
router.post('/login',
  passport.authenticate('local', { session: true, 
                                   successRedirect: '/',
                                   failureRedirect: '/auth/login',
                                   successFlash: 'Welcome!',
                                   failureFlash: 'Invalid username or password.' })
);

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