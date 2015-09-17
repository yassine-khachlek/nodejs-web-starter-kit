var express = require('express');
var router = express.Router();
var config = require('config');

// shared db over the process var until i found another clean solution!
db = process.db.users;

var ObjectId = require('../../../libs/ObjectId.js');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: config.get('authentication.passport.strategy.facebook.clientID'),
    clientSecret: config.get('authentication.passport.strategy.facebook.clientSecret'),
    callbackURL: config.get('authentication.passport.strategy.facebook.callbackURL'),
    profileFields: ['id','displayName','name','emails','photos'],
  },
  function(accessToken, refreshToken, profile, done) {
    
    //User.findOrCreate(..., function(err, user) {
    //  if (err) { return done(err); }
    //  done(null, user);
    //});

    //
    if( !profile.emails || !profile.emails[0] || !profile.emails[0].value ){
      var err = new Error("Can't get your email.");
    }
    if (err) { return done(err); }
    
    User = false;
    UserID = false;
    providerId = false;
    providerEmail = false;

    // Search for user using the provider data id and primary email
    db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: false})
      .on('data', function (data) {

        // Verify the user provider id
        if( data.value[profile.provider] && data.value[profile.provider].id && data.value[profile.provider].id == profile.id ) {
          User = data.value;
          UserID = data.key;
          providerId = true;
        }

        // Verify the user provider email and the local email
        data.value.local.emails.forEach(function(email, key){

          if( email.value == profile.emails[0].value ){
            User = data.value;
            UserID = data.key;
            providerEmail = true;
          }

        });

      })
      .on('error', function (err) {
        console.log(err)
      })
      .on('close', function () {
      })
      .on('end', function () {

        // User not found, create it
        if( !User ){
          
          User = {
            local: JSON.parse(JSON.stringify(profile)), // Clone the object profile
            facebook: JSON.parse(JSON.stringify(profile)), // Clone the object profile
          };

          // Set the user local id, only when created
          // the same local id is used as a key
          User.local.id = ObjectId();

          // Insert the created user
          db.put(User.local.id, User, {keyEncoding: 'utf8',valueEncoding: 'json',sync: false},function (err) {
            if (err){ // some kind of I/O error
              console.log(err);
            }else{
              console.log('ADDED', User);
            }
          })

          // Delete sensitive user data before serialization
          delete User.local.password;

          done(null, User);

        }else{
          
          // This mean that the account is present with both 
          // provider profile and local profile
          if( providerId && providerEmail ){

            // Nothing to do just return the user
            // and also if the provider email was changed,
            // we are using the provider id so no problem there
            
            // Delete sensitive user data before serialization
            delete User.local.password;
            
            done(null, User);

          }else{

            // The provider id was found, but not
            // the local account with the provider email
            // update the local account (populate it by the provider data)
            // later, the user can create his password, username, ...
            // to that time, he will be able to connect just with the provider
            // in this case facebook
            if( providerId && !providerEmail ){
              User.local = User.facebook;
              // Set the user local id using the key
              User.local.id = UserID;
            }

            // The user local data was found but not the provider data
            // so just update the provider data
            if( !providerId && providerEmail ){
              User.facebook = profile;
            }

            // Update data
            db.put(User.local.id, User, {keyEncoding: 'utf8',valueEncoding: 'json',sync: false},function (err) {
              if (err){ // some kind of I/O error
                console.log(err);
              }else{
                console.log('UPDATED: ', User);
              }
            }) 

            // Delete sensitive user data before serialization
            delete User.local.password;

            done(null, User);

          }

        }

      })
      
  }

));

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