var express = require('express');
var router = express.Router();
var config = require('config');

var https = require('https');
var querystring = require('querystring');

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

  }
));

router.get('/',
    passport.authenticate('facebook', { session: true,
                                        scope : ['email']
                                      })
);

module.exports = router;