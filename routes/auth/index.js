var express = require('express');
var router = express.Router();

// shared database over the process var until i found another clean solution!
var User = process.database.default.users.model;

var isValidPassword = function(user, password){
  return (user.local.password == password);
}

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    
    var queryObj = { 'local.username': username };
       
    // Check the username if it's a username or an email
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
    if( re.test(username) ){
      var queryObj = { 'local.emails.0.value': username };
    }

    User.findOne(queryObj, function(err, user) {
      if (err) { return done(err); }
      console.log(user);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!isValidPassword(user, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
    
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
                                   failureFlash: 'Invalid username or password.'
                                 })
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;