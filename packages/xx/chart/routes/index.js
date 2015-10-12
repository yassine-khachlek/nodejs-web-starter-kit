var express = require('express');
var router = express.Router();
var path = require('path');

var charts = [
	{
		uri: 'index',
	},	
	{
		uri: 'line',
	},
	{
		uri: 'bar',
	},
	{
		uri: 'radar',
	},
	{
		uri: 'polar',
	},
	{
		uri: 'pie',
	},
	{
		uri: 'doughnut',
	},
];

router.get('/', function(req, res, next) {

  res.render(path.resolve(__dirname, '../views/index'), { 
    base: req.app.get('app').base,
    xhr: req.xhr,  	
    title: 'Express',
  	routes: req.app.get('app').routes,
  	reqUser: req.user,
  	charts: charts
  });

});

router.get('/*', function(req, res, next) {
  
  console.log(req.params[0]);

  if( !req.params[0] ){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);    
    return
  }

  var params = req.params[0].split('/');

  if(!params[0]){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);    
    return
  }

  var chartName = params[0];
console.log(path.resolve(__dirname, '../views/index', chartName));
//  res.render('chart/'+chartName, { 
  res.render(path.resolve(__dirname, '../views/index', chartName), { 
    base: req.app.get('app').base,
    xhr: req.xhr,     	
    title: 'Express',
  	routes: req.app.get('app').routes,
  	reqUser: req.user,
  	charts: charts
  });
});

module.exports = router;
