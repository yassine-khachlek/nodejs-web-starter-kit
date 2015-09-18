var levelup = require('level')

var db = levelup('./database/role')

var ObjectId = require('../../libs/ObjectId.js');

var roles = [];

roles.push({
  'id': ObjectId(),
  'name': 'DEVELOPER',
  'displayName': 'DEVELOPER',
  'description': 'DEVELOPER',
  'sample_num': 1,
});

roles.push({
  'id': ObjectId(),
  'name': 'ADMINISTRATOR',
  'displayName': 'ADMINISTRATOR',
  'description': 'ADMINISTRATOR',
  'sample_num': 2,
});

roles.push({
  'id': ObjectId(),
  'name': 'REGISTERED_USER',
  'displayName': 'REGISTERED USER',
  'description': 'REGISTERED USER',
  'sample_num': 3,
});

// Gert all roles from the db
var rolesN = [];

db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: true})
  .on('data', function (data) {
    console.log(data.key, '=', data.value);
    rolesN.push(data.value.sample_num);
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed');

    // Loop into the created roles array
    roles.forEach(function(role, index){

      // Insert the role when the sample_num doesn't exist
      if( rolesN.indexOf(role.sample_num)<0 ){

        console.log('NOT FOUND: ', role.sample_num);

        db.put(role.id, role, {keyEncoding: 'utf8',valueEncoding: 'json',sync: true},function (err) {
          
          if (err){ // some kind of I/O error
            console.log(err);
          }else{
            console.log('ADDED', role);
          }

        })
      
      }else{
        console.log('EXIST', role.sample_num);
      }

    });

  })
  .on('end', function () {
    console.log('Stream end');
  })
