var levelup = require('level')

var db = levelup('./database/user')

var users = [];

for(i=1;i<10;+i++){
  users.push({
    'id': i,
    'username': 'username_'+i,
    'password': 'password_'+i,
  });
}

// Insert users sample data

users.forEach(function(user, index){

  db.get(user.id, function (err, userValue) {

    if (err) { // the key was not found

      console.log('NOT FOUND: ', err);

      db.put(user.id, user, {keyEncoding: 'utf8',valueEncoding: 'json',sync: true},function (err) {
        
        if (err){ // some kind of I/O error
          console.log(err);
        }else{
          console.log('ADDED', user);
        }

      })

    }else{
      console.log('EXIST', userValue);
    }

  })

});

