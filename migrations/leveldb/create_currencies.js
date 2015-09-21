var levelup = require('level')

var db = levelup('./database/currency')

var ObjectId = require('../../libs/ObjectId.js');

var currenciesObj = {
 "BD":  {
          "code": "BDT",
          "name": ""
        },
 "BE":  {
          "code": "EUR",
          "name": ""
        },
 "BF":  {
          "code": "XOF",
          "name": ""
        },
 "BG":  {
          "code": "BGN",
          "name": ""
        },
 "BA":  {
          "code": "BAM",
          "name": ""
        },
 "BB":  {
          "code": "BBD",
          "name": ""
        },
 "WF":  {
          "code": "XPF",
          "name": ""
        },
 "BL":  {
          "code": "EUR",
          "name": ""
        },
 "BM":  {
          "code": "BMD",
          "name": ""
        },
 "BN":  {
          "code": "BND",
          "name": ""
        },
 "BO":  {
          "code": "BOB",
          "name": ""
        },
 "BH":  {
          "code": "BHD",
          "name": ""
        },
 "BI":  {
          "code": "BIF",
          "name": ""
        },
 "BJ":  {
          "code": "XOF",
          "name": ""
        },
 "BT":  {
          "code": "BTN",
          "name": ""
        },
 "JM":  {
          "code": "JMD",
          "name": ""
        },
 "BV":  {
          "code": "NOK",
          "name": ""
        },
 "BW":  {
          "code": "BWP",
          "name": ""
        },
 "WS":  {
          "code": "WST",
          "name": ""
        },
 "BQ":  {
          "code": "USD",
          "name": ""
        },
 "BR":  {
          "code": "BRL",
          "name": ""
        },
 "BS":  {
          "code": "BSD",
          "name": ""
        },
 "JE":  {
          "code": "GBP",
          "name": ""
        },
 "BY":  {
          "code": "BYR",
          "name": ""
        },
 "BZ":  {
          "code": "BZD",
          "name": ""
        },
 "RU":  {
          "code": "RUB",
          "name": ""
        },
 "RW":  {
          "code": "RWF",
          "name": ""
        },
 "RS":  {
          "code": "RSD",
          "name": ""
        },
 "TL":  {
          "code": "USD",
          "name": ""
        },
 "RE":  {
          "code": "EUR",
          "name": ""
        },
 "TM":  {
          "code": "TMT",
          "name": ""
        },
 "TJ":  {
          "code": "TJS",
          "name": ""
        },
 "RO":  {
          "code": "RON",
          "name": ""
        },
 "TK":  {
          "code": "NZD",
          "name": ""
        },
 "GW":  {
          "code": "XOF",
          "name": ""
        },
 "GU":  {
          "code": "USD",
          "name": ""
        },
 "GT":  {
          "code": "GTQ",
          "name": ""
        },
 "GS":  {
          "code": "GBP",
          "name": ""
        },
 "GR":  {
          "code": "EUR",
          "name": ""
        },
 "GQ":  {
          "code": "XAF",
          "name": ""
        },
 "GP":  {
          "code": "EUR",
          "name": ""
        },
 "JP":  {
          "code": "JPY",
          "name": ""
        },
 "GY":  {
          "code": "GYD",
          "name": ""
        },
 "GG":  {
          "code": "GBP",
          "name": ""
        },
 "GF":  {
          "code": "EUR",
          "name": ""
        },
 "GE":  {
          "code": "GEL",
          "name": ""
        },
 "GD":  {
          "code": "XCD",
          "name": ""
        },
 "GB":  {
          "code": "GBP",
          "name": ""
        },
 "GA":  {
          "code": "XAF",
          "name": ""
        },
 "SV":  {
          "code": "USD",
          "name": ""
        },
 "GN":  {
          "code": "GNF",
          "name": ""
        },
 "GM":  {
          "code": "GMD",
          "name": ""
        },
 "GL":  {
          "code": "DKK",
          "name": ""
        },
 "GI":  {
          "code": "GIP",
          "name": ""
        },
 "GH":  {
          "code": "GHS",
          "name": ""
        },
 "OM":  {
          "code": "OMR",
          "name": ""
        },
 "TN":  {
          "code": "TND",
          "name": ""
        },
 "JO":  {
          "code": "JOD",
          "name": ""
        },
 "HR":  {
          "code": "HRK",
          "name": ""
        },
 "HT":  {
          "code": "HTG",
          "name": ""
        },
 "HU":  {
          "code": "HUF",
          "name": ""
        },
 "HK":  {
          "code": "HKD",
          "name": ""
        },
 "HN":  {
          "code": "HNL",
          "name": ""
        },
 "HM":  {
          "code": "AUD",
          "name": ""
        },
 "VE":  {
          "code": "VEF",
          "name": ""
        },
 "PR":  {
          "code": "USD",
          "name": ""
        },
 "PS":  {
          "code": "ILS",
          "name": ""
        },
 "PW":  {
          "code": "USD",
          "name": ""
        },
 "PT":  {
          "code": "EUR",
          "name": ""
        },
 "SJ":  {
          "code": "NOK",
          "name": ""
        },
 "PY":  {
          "code": "PYG",
          "name": ""
        },
 "IQ":  {
          "code": "IQD",
          "name": ""
        },
 "PA":  {
          "code": "PAB",
          "name": ""
        },
 "PF":  {
          "code": "XPF",
          "name": ""
        },
 "PG":  {
          "code": "PGK",
          "name": ""
        },
 "PE":  {
          "code": "PEN",
          "name": ""
        },
 "PK":  {
          "code": "PKR",
          "name": ""
        },
 "PH":  {
          "code": "PHP",
          "name": ""
        },
 "PN":  {
          "code": "NZD",
          "name": ""
        },
 "PL":  {
          "code": "PLN",
          "name": ""
        },
 "PM":  {
          "code": "EUR",
          "name": ""
        },
 "ZM":  {
          "code": "ZMK",
          "name": ""
        },
 "EH":  {
          "code": "MAD",
          "name": ""
        },
 "EE":  {
          "code": "EUR",
          "name": ""
        },
 "EG":  {
          "code": "EGP",
          "name": ""
        },
 "ZA":  {
          "code": "ZAR",
          "name": ""
        },
 "EC":  {
          "code": "USD",
          "name": ""
        },
 "IT":  {
          "code": "EUR",
          "name": ""
        },
 "VN":  {
          "code": "VND",
          "name": ""
        },
 "SB":  {
          "code": "SBD",
          "name": ""
        },
 "ET":  {
          "code": "ETB",
          "name": ""
        },
 "SO":  {
          "code": "SOS",
          "name": ""
        },
 "ZW":  {
          "code": "ZWL",
          "name": ""
        },
 "SA":  {
          "code": "SAR",
          "name": ""
        },
 "ES":  {
          "code": "EUR",
          "name": ""
        },
 "ER":  {
          "code": "ERN",
          "name": ""
        },
 "ME":  {
          "code": "EUR",
          "name": ""
        },
 "MD":  {
          "code": "MDL",
          "name": ""
        },
 "MG":  {
          "code": "MGA",
          "name": ""
        },
 "MF":  {
          "code": "EUR",
          "name": ""
        },
 "MA":  {
          "code": "MAD",
          "name": ""
        },
 "MC":  {
          "code": "EUR",
          "name": ""
        },
 "UZ":  {
          "code": "UZS",
          "name": ""
        },
 "MM":  {
          "code": "MMK",
          "name": ""
        },
 "ML":  {
          "code": "XOF",
          "name": ""
        },
 "MO":  {
          "code": "MOP",
          "name": ""
        },
 "MN":  {
          "code": "MNT",
          "name": ""
        },
 "MH":  {
          "code": "USD",
          "name": ""
        },
 "MK":  {
          "code": "MKD",
          "name": ""
        },
 "MU":  {
          "code": "MUR",
          "name": ""
        },
 "MT":  {
          "code": "EUR",
          "name": ""
        },
 "MW":  {
          "code": "MWK",
          "name": ""
        },
 "MV":  {
          "code": "MVR",
          "name": ""
        },
 "MQ":  {
          "code": "EUR",
          "name": ""
        },
 "MP":  {
          "code": "USD",
          "name": ""
        },
 "MS":  {
          "code": "XCD",
          "name": ""
        },
 "MR":  {
          "code": "MRO",
          "name": ""
        },
 "IM":  {
          "code": "GBP",
          "name": ""
        },
 "UG":  {
          "code": "UGX",
          "name": ""
        },
 "TZ":  {
          "code": "TZS",
          "name": ""
        },
 "MY":  {
          "code": "MYR",
          "name": ""
        },
 "MX":  {
          "code": "MXN",
          "name": ""
        },
 "IL":  {
          "code": "ILS",
          "name": ""
        },
 "FR":  {
          "code": "EUR",
          "name": ""
        },
 "IO":  {
          "code": "USD",
          "name": ""
        },
 "SH":  {
          "code": "SHP",
          "name": ""
        },
 "FI":  {
          "code": "EUR",
          "name": ""
        },
 "FJ":  {
          "code": "FJD",
          "name": ""
        },
 "FK":  {
          "code": "FKP",
          "name": ""
        },
 "FM":  {
          "code": "USD",
          "name": ""
        },
 "FO":  {
          "code": "DKK",
          "name": ""
        },
 "NI":  {
          "code": "NIO",
          "name": ""
        },
 "NL":  {
          "code": "EUR",
          "name": ""
        },
 "NO":  {
          "code": "NOK",
          "name": ""
        },
 "NA":  {
          "code": "NAD",
          "name": ""
        },
 "VU":  {
          "code": "VUV",
          "name": ""
        },
 "NC":  {
          "code": "XPF",
          "name": ""
        },
 "NE":  {
          "code": "XOF",
          "name": ""
        },
 "NF":  {
          "code": "AUD",
          "name": ""
        },
 "NG":  {
          "code": "NGN",
          "name": ""
        },
 "NZ":  {
          "code": "NZD",
          "name": ""
        },
 "NP":  {
          "code": "NPR",
          "name": ""
        },
 "NR":  {
          "code": "AUD",
          "name": ""
        },
 "NU":  {
          "code": "NZD",
          "name": ""
        },
 "CK":  {
          "code": "NZD",
          "name": ""
        },
 "XK":  {
          "code": "EUR",
          "name": ""
        },
 "CI":  {
          "code": "XOF",
          "name": ""
        },
 "CH":  {
          "code": "CHF",
          "name": ""
        },
 "CO":  {
          "code": "COP",
          "name": ""
        },
 "CN":  {
          "code": "CNY",
          "name": ""
        },
 "CM":  {
          "code": "XAF",
          "name": ""
        },
 "CL":  {
          "code": "CLP",
          "name": ""
        },
 "CC":  {
          "code": "AUD",
          "name": ""
        },
 "CA":  {
          "code": "CAD",
          "name": ""
        },
 "CG":  {
          "code": "XAF",
          "name": ""
        },
 "CF":  {
          "code": "XAF",
          "name": ""
        },
 "CD":  {
          "code": "CDF",
          "name": ""
        },
 "CZ":  {
          "code": "CZK",
          "name": ""
        },
 "CY":  {
          "code": "EUR",
          "name": ""
        },
 "CX":  {
          "code": "AUD",
          "name": ""
        },
 "CR":  {
          "code": "CRC",
          "name": ""
        },
 "CW":  {
          "code": "ANG",
          "name": ""
        },
 "CV":  {
          "code": "CVE",
          "name": ""
        },
 "CU":  {
          "code": "CUP",
          "name": ""
        },
 "SZ":  {
          "code": "SZL",
          "name": ""
        },
 "SY":  {
          "code": "SYP",
          "name": ""
        },
 "SX":  {
          "code": "ANG",
          "name": ""
        },
 "KG":  {
          "code": "KGS",
          "name": ""
        },
 "KE":  {
          "code": "KES",
          "name": ""
        },
 "SS":  {
          "code": "SSP",
          "name": ""
        },
 "SR":  {
          "code": "SRD",
          "name": ""
        },
 "KI":  {
          "code": "AUD",
          "name": ""
        },
 "KH":  {
          "code": "KHR",
          "name": ""
        },
 "KN":  {
          "code": "XCD",
          "name": ""
        },
 "KM":  {
          "code": "KMF",
          "name": ""
        },
 "ST":  {
          "code": "STD",
          "name": ""
        },
 "SK":  {
          "code": "EUR",
          "name": ""
        },
 "KR":  {
          "code": "KRW",
          "name": ""
        },
 "SI":  {
          "code": "EUR",
          "name": ""
        },
 "KP":  {
          "code": "KPW",
          "name": ""
        },
 "KW":  {
          "code": "KWD",
          "name": ""
        },
 "SN":  {
          "code": "XOF",
          "name": ""
        },
 "SM":  {
          "code": "EUR",
          "name": ""
        },
 "SL":  {
          "code": "SLL",
          "name": ""
        },
 "SC":  {
          "code": "SCR",
          "name": ""
        },
 "KZ":  {
          "code": "KZT",
          "name": ""
        },
 "KY":  {
          "code": "KYD",
          "name": ""
        },
 "SG":  {
          "code": "SGD",
          "name": ""
        },
 "SE":  {
          "code": "SEK",
          "name": ""
        },
 "SD":  {
          "code": "SDG",
          "name": ""
        },
 "DO":  {
          "code": "DOP",
          "name": ""
        },
 "DM":  {
          "code": "XCD",
          "name": ""
        },
 "DJ":  {
          "code": "DJF",
          "name": ""
        },
 "DK":  {
          "code": "DKK",
          "name": ""
        },
 "VG":  {
          "code": "USD",
          "name": ""
        },
 "DE":  {
          "code": "EUR",
          "name": ""
        },
 "YE":  {
          "code": "YER",
          "name": ""
        },
 "DZ":  {
          "code": "DZD",
          "name": ""
        },
 "US":  {
          "code": "USD",
          "name": ""
        },
 "UY":  {
          "code": "UYU",
          "name": ""
        },
 "YT":  {
          "code": "EUR",
          "name": ""
        },
 "UM":  {
          "code": "USD",
          "name": ""
        },
 "LB":  {
          "code": "LBP",
          "name": ""
        },
 "LC":  {
          "code": "XCD",
          "name": ""
        },
 "LA":  {
          "code": "LAK",
          "name": ""
        },
 "TV":  {
          "code": "AUD",
          "name": ""
        },
 "TW":  {
          "code": "TWD",
          "name": ""
        },
 "TT":  {
          "code": "TTD",
          "name": ""
        },
 "TR":  {
          "code": "TRY",
          "name": ""
        },
 "LK":  {
          "code": "LKR",
          "name": ""
        },
 "LI":  {
          "code": "CHF",
          "name": ""
        },
 "LV":  {
          "code": "EUR",
          "name": ""
        },
 "TO":  {
          "code": "TOP",
          "name": ""
        },
 "LT":  {
          "code": "LTL",
          "name": ""
        },
 "LU":  {
          "code": "EUR",
          "name": ""
        },
 "LR":  {
          "code": "LRD",
          "name": ""
        },
 "LS":  {
          "code": "LSL",
          "name": ""
        },
 "TH":  {
          "code": "THB",
          "name": ""
        },
 "TF":  {
          "code": "EUR",
          "name": ""
        },
 "TG":  {
          "code": "XOF",
          "name": ""
        },
 "TD":  {
          "code": "XAF",
          "name": ""
        },
 "TC":  {
          "code": "USD",
          "name": ""
        },
 "LY":  {
          "code": "LYD",
          "name": ""
        },
 "VA":  {
          "code": "EUR",
          "name": ""
        },
 "VC":  {
          "code": "XCD",
          "name": ""
        },
 "AE":  {
          "code": "AED",
          "name": ""
        },
 "AD":  {
          "code": "EUR",
          "name": ""
        },
 "AG":  {
          "code": "XCD",
          "name": ""
        },
 "AF":  {
          "code": "AFN",
          "name": ""
        },
 "AI":  {
          "code": "XCD",
          "name": ""
        },
 "VI":  {
          "code": "USD",
          "name": ""
        },
 "IS":  {
          "code": "ISK",
          "name": ""
        },
 "IR":  {
          "code": "IRR",
          "name": ""
        },
 "AM":  {
          "code": "AMD",
          "name": ""
        },
 "AL":  {
          "code": "ALL",
          "name": ""
        },
 "AO":  {
          "code": "AOA",
          "name": ""
        },
 "AQ":  {
          "code": "",
          "name": ""
        },
 "AS":  {
          "code": "USD",
          "name": ""
        },
 "AR":  {
          "code": "ARS",
          "name": ""
        },
 "AU":  {
          "code": "AUD",
          "name": ""
        },
 "AT":  {
          "code": "EUR",
          "name": ""
        },
 "AW":  {
          "code": "AWG",
          "name": ""
        },
 "IN":  {
          "code": "INR",
          "name": ""
        },
 "AX":  {
          "code": "EUR",
          "name": ""
        },
 "AZ":  {
          "code": "AZN",
          "name": ""
        },
 "IE":  {
          "code": "EUR",
          "name": ""
        },
 "ID":  {
          "code": "IDR",
          "name": ""
        },
 "UA":  {
          "code": "UAH",
          "name": ""
        },
 "QA":  {
          "code": "QAR",
          "name": ""
        },
 "MZ":  {
          "code": "MZN",
          "name": ""
        }
};

var currencies = [];

Object.keys(currenciesObj).forEach(function(currency){
  currencies.push({
      'id': ObjectId(),
      'iso': {
         '4217': {
            'code': currenciesObj[currency].code,
         }
      },
      'name': currenciesObj[currency].code,
      'country': {
         'iso': {
            '3166': {
               '1': {
                  'alpha': {
                     '2': currency // the iso 2 country code
                  }
               }
            }
         }
      }
  });
});


// Get all from the db
var currenciesISOCODE = [];

db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: true})
  .on('data', function (data) {
    console.log(data.key, '=', data.value);
    currenciesISOCODE.push(data.value.iso['4217'].code);
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed');

    // Loop into the created users array
    currencies.forEach(function(currency, index){

      // Insert the user when the username doesn't exist
      if( currenciesISOCODE.indexOf(currency.iso['4217'].code)<0 ){

        console.log('NOT FOUND: ', currency.iso['4217'].code);

        db.put(currency.id, currency, {keyEncoding: 'utf8',valueEncoding: 'json',sync: true},function (err) {
          
          if (err){ // some kind of I/O error
            console.log(err);
          }else{
            console.log('ADDED', currency);
          }

        })
      
      }else{
        console.log('EXIST', currency.iso['4217'].code);
      }

    });

  })
  .on('end', function () {
    console.log('Stream end');
  })
  