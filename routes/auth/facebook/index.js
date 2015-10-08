var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');

// shared db over the process var until i found another clean solution!
var User = process.database.default.users.model;

var ObjectId = require('../../../libs/ObjectId.js');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.auth.passport.strategy.facebook.clientID,
    clientSecret: process.auth.passport.strategy.facebook.clientSecret,
    callbackURL: process.auth.passport.strategy.facebook.callbackURL,
    profileFields: ['id','displayName','name','emails','photos'],
  },
  function(accessToken, refreshToken, profile, done) {
    
    //User.findOrCreate(..., function(err, user) {
    //  if (err) { return done(err); }
    //  done(null, user);
    //});

    // Check for needed permissions
    if( !profile.emails || !profile.emails[0] || !profile.emails[0].value ){
      var err = new Error("We could not create your account. Please try again and thanks to sharing with us your email address.");
    }

    // If needed permissions are missing, revoke access
    // this needed, so user can login with the app again
    // if not, the user should delete the app manually from the provider settings!!
    if (err) { 

      var options = {
        hostname: 'graph.facebook.com',
        port: 443,
        path: '/'+profile.id+'/permissions',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(querystring.stringify({
              access_token: accessToken,
            })),
        }
      };    

      var req = https.request(options, function(res) {

        var providerResponse = '';

        res.on('data', function(chunk) {
          providerResponse += chunk;
        });

        res.on('end', function() {

          if( !JSON.parse(providerResponse) || !JSON.parse(providerResponse).success ){
            var err = new Error("We received a wrong Facebook response.");
          }
          var err = new Error("We could not create your account. Please try again and thanks to sharing with us your email address.");
          return done(err);

        });

      });

      req.on('error', function(e) {
        return done(e); 
      });

      req.write(querystring.stringify({
              access_token: accessToken,
            }));
      req.end();
    
    }else{


      // Search for user using the provider id
      User.findOne({'facebook.id': profile.id}, function(err, user) {

        if (err) { return done(err); }

        if (!user) {

          // Search for user using the provider email
          User.findOne({'local.emails.0.value': profile.emails[0].value}, function(err, user) {

            if (err) { return done(err); }

            // provider email not found, create a new user
            if (!user) {

              var newUserData = {
                local: JSON.parse(JSON.stringify(profile)), // Clone the object profile
                facebook: JSON.parse(JSON.stringify(profile)) // Clone the object profile
              };

              var newUserModel = new User(newUserData);

              // Insert the new user
              newUserModel.save(function (err) {
                
                if (err){ // some kind of I/O error

                  console.log(err);

                  if (err) { return done(err); }

                }else{

                  User.findById(newUserModel, function (err, newUser) {
                    if (err) { return done(err); }
                    done(null, newUser);
                  })

                }

              })

            }else{
              
              // provider id not found but provider email found in local account
              // update the provider data

              user.facebook = profile;

              user.save(function (err) {
                
                if (err){ // some kind of I/O error

                  console.log(err);

                  if (err) { return done(err); }

                }else{

                  User.findById(user, function (err, updatedUser) {
                    if (err) { return done(err); }
                    done(null, updatedUser);
                  })

                }

              })

            }

          }); 

        }else{
          // provider id found, return the user
          done(null, user);
        }

      });      
        
    }

  }
));

router.get('/',
    passport.authenticate('facebook', { session: true,
                                        scope : ['email']
                                      })
);

module.exports = router;