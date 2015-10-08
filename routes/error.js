/**
  Error route, used for angular request only (xhr)
  For direct request error, the default handler is inside app.js
*/
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {

  // catch 404 and forward to error handler
  var err = new Error('Not Found');
  err.status = 404;

  // error handlers

  // development error handler
  // will print stacktrace
  if (req.app.get('env') !== 'development') {
  	// production error handler
  	// no stacktraces leaked to user
  	err.stack = 'The requested URL was not found on this server.';
  }

  //err.uri = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.render(path.join('error', 'index'), {
    base: req.app.get('base'),
    xhr: req.xhr,
    error: err,
  });
  
});

module.exports = router;
