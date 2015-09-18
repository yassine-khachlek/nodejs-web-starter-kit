
var levelup = require('level')

var db = levelup('./database/user')

var ObjectId = require('../../libs/ObjectId.js');

var users = [];

users.push({
    local: {
      'id': ObjectId(), // This should be changed later with an ObjectId
      'displayName': 'Yassine Khachlek',
      'username': 'yassine_khachlek',
      'emails': [{value: 'yassine.khachlek@gmail.com'}],
      'password': 'password',
    }
  });

for(i=1;i<=10;+i++){
  users.push({
    local: {
      'id': ObjectId(), // This should be changed later with an ObjectId
      'displayName': 'username_' + i,
      'username': 'username_' + i,
      'emails': [{value: 'email_' + i + '@example.com'}],
      'password': 'password_' + i,
    }
  });
}

// Gert all usernames from the db
var usersUsername = [];

db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: true})
  .on('data', function (data) {
    console.log(data.key, '=', data.value);
    usersUsername.push(data.value.local.username);
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed');

    // Loop into the created users array
    users.forEach(function(user, index){

      // Insert the user when the username doesn't exist
      if( usersUsername.indexOf(user.local.username)<0 ){

        console.log('NOT FOUND: ', user.local.username);

        db.put(user.local.id, user, {keyEncoding: 'utf8',valueEncoding: 'json',sync: true},function (err) {
          
          if (err){ // some kind of I/O error
            console.log(err);
          }else{
            console.log('ADDED', user);
          }

        })
      
      }else{
        console.log('EXIST', user.local.username);
      }

    });

  })
  .on('end', function () {
    console.log('Stream end');
  })
