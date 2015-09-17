var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  var db = req.app.get('app').db.users;
  var users = [];

  db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: false})
    .on('data', function (data) {
      users.push(data.value);
    })
    .on('error', function (err) {
      console.log(err)
    })
    .on('close', function () {
    })
    .on('end', function () {

	  res.render('database', { 
	    title: 'Express',
	    routes: req.app.get('app').routes,
	    reqUser: req.user,
	    reqFlashSuccess: req.flash('success'),
	    users: users,     
	  });

    })

});

module.exports = router;
