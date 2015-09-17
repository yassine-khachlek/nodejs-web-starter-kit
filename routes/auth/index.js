var express = require('express');
var router = express.Router();
var config = require('config');

// shared db over the process var until i found another clean solution!
db = process.db.users;

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
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
        //console.log(data.key, '=', data.value);
        
        // Verify if username is a username or email
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
        if( re.test(username) ){
  
          data.value.local.emails.forEach(function(email, key){

            if( email.value == username && data.value.local.password == password ){
      
              User = data.value;
            }

          });
  
        }else{

          if( data.value.local.username == username && data.value.local.password == password ){
            User = data.value;
          }
  
        }
  
      })
      .on('error', function (err) {
        console.log(err)
      })
      .on('close', function () {
      })
      .on('end', function () {
        if( !User ){
          return done(null, false, { message: 'Invalid username or password.' });
        }
        // Delete sensitive user data before serialization
        delete User.local.password;
        return done(null, User);
      })
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