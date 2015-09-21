var express = require('express');
var router = express.Router();

var i18n = [
  {
    uri: 'index',
  },
	{
		uri: 'languages',
	},
	{
		uri: 'countries',
	},
  {
    uri: 'currencies',
  },
];

router.get('/', function(req, res, next) {

  res.render('i18n/index', { 
    title: 'Express',
    routes: req.app.get('app').routes,
    reqUser: req.user,
    i18n: i18n
  });

});

router.get('/languages', function(req, res, next) {
  
  var db = req.app.get('app').db['languages'];

  var languages = [];

  db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: false})
    .on('data', function (data) {
      //delete data.value.local.password;
      languages.push(data.value);
    })
    .on('error', function (err) {
      console.log(err)
    })
    .on('close', function () {
    })
    .on('end', function () {

      res.render('i18n/index', { 
        title: 'Express',
        routes: req.app.get('app').routes,
        reqUser: req.user,
        i18n: i18n,
        languages: languages,
      });

    })

});

router.get('/countries', function(req, res, next) {
  
  var dbCountries = req.app.get('app').db['countries'];

  var countries = [];

  dbCountries.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: false})
    .on('data', function (data) {
      //delete data.value.local.password;
      countries.push(data.value);
    })
    .on('error', function (err) {
      console.log(err)
    })
    .on('close', function () {
    })
    .on('end', function () {

      res.render('i18n/index', { 
        title: 'Express',
        routes: req.app.get('app').routes,
        reqUser: req.user,
        i18n: i18n,
        countries: countries,
      });

    })

});

router.get('/currencies', function(req, res, next) {
  
  var dbCurrencies = req.app.get('app').db['currencies'];

  var currencies = [];

  dbCurrencies.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: false})
    .on('data', function (data) {
      //delete data.value.local.password;
      currencies.push(data.value);
    })
    .on('error', function (err) {
      console.log(err)
    })
    .on('close', function () {
    })
    .on('end', function () {

      res.render('i18n/index', { 
        title: 'Express',
        routes: req.app.get('app').routes,
        reqUser: req.user,
        i18n: i18n,
        currencies: currencies,
      });

    })

});

module.exports = router;
