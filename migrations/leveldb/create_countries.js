var levelup = require('level')

var db = levelup('./database/country')

var ObjectId = require('../../libs/ObjectId.js');

var countriesObj = {  
   "BD": {"name": "Bangladesh", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BE": {"name": "Belgium", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BF": {"name": "Burkina Faso", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BG": {"name": "Bulgaria", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BA": {"name": "Bosnia and Herzegovina", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BB": {"name": "Barbados", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "WF": {"name": "Wallis and Futuna", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BL": {"name": "Saint Barthelemy", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BM": {"name": "Bermuda", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BN": {"name": "Brunei", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BO": {"name": "Bolivia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BH": {"name": "Bahrain", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BI": {"name": "Burundi", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BJ": {"name": "Benin", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BT": {"name": "Bhutan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "JM": {"name": "Jamaica", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BV": {"name": "Bouvet Island", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BW": {"name": "Botswana", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "WS": {"name": "Samoa", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BQ": {"name": "Bonaire, Saint Eustatius and Saba ", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BR": {"name": "Brazil", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BS": {"name": "Bahamas", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "JE": {"name": "Jersey", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BY": {"name": "Belarus", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "BZ": {"name": "Belize", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "RU": {"name": "Russia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "RW": {"name": "Rwanda", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "RS": {"name": "Serbia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TL": {"name": "East Timor", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "RE": {"name": "Reunion", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TM": {"name": "Turkmenistan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TJ": {"name": "Tajikistan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "RO": {"name": "Romania", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TK": {"name": "Tokelau", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GW": {"name": "Guinea-Bissau", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GU": {"name": "Guam", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GT": {"name": "Guatemala", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GS": {"name": "South Georgia and the South Sandwich Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GR": {"name": "Greece", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GQ": {"name": "Equatorial Guinea", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GP": {"name": "Guadeloupe", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "JP": {"name": "Japan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GY": {"name": "Guyana", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GG": {"name": "Guernsey", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GF": {"name": "French Guiana", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GE": {"name": "Georgia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GD": {"name": "Grenada", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GB": {"name": "United Kingdom", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GA": {"name": "Gabon", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SV": {"name": "El Salvador", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GN": {"name": "Guinea", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GM": {"name": "Gambia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GL": {"name": "Greenland", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GI": {"name": "Gibraltar", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "GH": {"name": "Ghana", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "OM": {"name": "Oman", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TN": {"name": "Tunisia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "JO": {"name": "Jordan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "HR": {"name": "Croatia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "HT": {"name": "Haiti", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "HU": {"name": "Hungary", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "HK": {"name": "Hong Kong", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "HN": {"name": "Honduras", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "HM": {"name": "Heard Island and McDonald Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "VE": {"name": "Venezuela", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PR": {"name": "Puerto Rico", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PS": {"name": "Palestinian Territory", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PW": {"name": "Palau", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PT": {"name": "Portugal", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SJ": {"name": "Svalbard and Jan Mayen", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PY": {"name": "Paraguay", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IQ": {"name": "Iraq", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PA": {"name": "Panama", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PF": {"name": "French Polynesia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PG": {"name": "Papua New Guinea", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PE": {"name": "Peru", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PK": {"name": "Pakistan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PH": {"name": "Philippines", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PN": {"name": "Pitcairn", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PL": {"name": "Poland", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "PM": {"name": "Saint Pierre and Miquelon", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ZM": {"name": "Zambia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "EH": {"name": "Western Sahara", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "EE": {"name": "Estonia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "EG": {"name": "Egypt", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ZA": {"name": "South Africa", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "EC": {"name": "Ecuador", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IT": {"name": "Italy", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "VN": {"name": "Vietnam", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SB": {"name": "Solomon Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ET": {"name": "Ethiopia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SO": {"name": "Somalia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ZW": {"name": "Zimbabwe", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SA": {"name": "Saudi Arabia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ES": {"name": "Spain", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ER": {"name": "Eritrea", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ME": {"name": "Montenegro", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MD": {"name": "Moldova", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MG": {"name": "Madagascar", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MF": {"name": "Saint Martin", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MA": {"name": "Morocco", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MC": {"name": "Monaco", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "UZ": {"name": "Uzbekistan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MM": {"name": "Myanmar", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ML": {"name": "Mali", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MO": {"name": "Macao", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MN": {"name": "Mongolia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MH": {"name": "Marshall Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MK": {"name": "Macedonia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MU": {"name": "Mauritius", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MT": {"name": "Malta", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MW": {"name": "Malawi", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MV": {"name": "Maldives", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MQ": {"name": "Martinique", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MP": {"name": "Northern Mariana Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MS": {"name": "Montserrat", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MR": {"name": "Mauritania", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IM": {"name": "Isle of Man", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "UG": {"name": "Uganda", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TZ": {"name": "Tanzania", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MY": {"name": "Malaysia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MX": {"name": "Mexico", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IL": {"name": "Israel", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "FR": {"name": "France", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IO": {"name": "British Indian Ocean Territory", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SH": {"name": "Saint Helena", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "FI": {"name": "Finland", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "FJ": {"name": "Fiji", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "FK": {"name": "Falkland Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "FM": {"name": "Micronesia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "FO": {"name": "Faroe Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NI": {"name": "Nicaragua", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NL": {"name": "Netherlands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NO": {"name": "Norway", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NA": {"name": "Namibia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "VU": {"name": "Vanuatu", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NC": {"name": "New Caledonia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NE": {"name": "Niger", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NF": {"name": "Norfolk Island", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NG": {"name": "Nigeria", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NZ": {"name": "New Zealand", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NP": {"name": "Nepal", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NR": {"name": "Nauru", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "NU": {"name": "Niue", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CK": {"name": "Cook Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "XK": {"name": "Kosovo", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CI": {"name": "Ivory Coast", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CH": {"name": "Switzerland", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CO": {"name": "Colombia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CN": {"name": "China", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CM": {"name": "Cameroon", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CL": {"name": "Chile", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CC": {"name": "Cocos Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CA": {"name": "Canada", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CG": {"name": "Republic of the Congo", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CF": {"name": "Central African Republic", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CD": {"name": "Democratic Republic of the Congo", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CZ": {"name": "Czech Republic", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CY": {"name": "Cyprus", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CX": {"name": "Christmas Island", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CR": {"name": "Costa Rica", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CW": {"name": "Curacao", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CV": {"name": "Cape Verde", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "CU": {"name": "Cuba", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SZ": {"name": "Swaziland", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SY": {"name": "Syria", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SX": {"name": "Sint Maarten", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KG": {"name": "Kyrgyzstan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KE": {"name": "Kenya", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SS": {"name": "South Sudan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SR": {"name": "Suriname", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KI": {"name": "Kiribati", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KH": {"name": "Cambodia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KN": {"name": "Saint Kitts and Nevis", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KM": {"name": "Comoros", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ST": {"name": "Sao Tome and Principe", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SK": {"name": "Slovakia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KR": {"name": "South Korea", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SI": {"name": "Slovenia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KP": {"name": "North Korea", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KW": {"name": "Kuwait", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SN": {"name": "Senegal", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SM": {"name": "San Marino", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SL": {"name": "Sierra Leone", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SC": {"name": "Seychelles", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KZ": {"name": "Kazakhstan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "KY": {"name": "Cayman Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SG": {"name": "Singapore", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SE": {"name": "Sweden", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "SD": {"name": "Sudan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "DO": {"name": "Dominican Republic", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "DM": {"name": "Dominica", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "DJ": {"name": "Djibouti", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "DK": {"name": "Denmark", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "VG": {"name": "British Virgin Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "DE": {"name": "Germany", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "YE": {"name": "Yemen", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "DZ": {"name": "Algeria", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "US": {"name": "United States", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "UY": {"name": "Uruguay", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "YT": {"name": "Mayotte", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "UM": {"name": "United States Minor Outlying Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LB": {"name": "Lebanon", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LC": {"name": "Saint Lucia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LA": {"name": "Laos", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TV": {"name": "Tuvalu", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TW": {"name": "Taiwan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TT": {"name": "Trinidad and Tobago", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TR": {"name": "Turkey", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LK": {"name": "Sri Lanka", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LI": {"name": "Liechtenstein", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LV": {"name": "Latvia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TO": {"name": "Tonga", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LT": {"name": "Lithuania", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LU": {"name": "Luxembourg", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LR": {"name": "Liberia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LS": {"name": "Lesotho", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TH": {"name": "Thailand", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TF": {"name": "French Southern Territories", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TG": {"name": "Togo", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TD": {"name": "Chad", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "TC": {"name": "Turks and Caicos Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "LY": {"name": "Libya", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "VA": {"name": "Vatican", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "VC": {"name": "Saint Vincent and the Grenadines", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AE": {"name": "United Arab Emirates", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AD": {"name": "Andorra", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AG": {"name": "Antigua and Barbuda", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AF": {"name": "Afghanistan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AI": {"name": "Anguilla", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "VI": {"name": "U.S. Virgin Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IS": {"name": "Iceland", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IR": {"name": "Iran", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AM": {"name": "Armenia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AL": {"name": "Albania", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AO": {"name": "Angola", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AQ": {"name": "Antarctica", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AS": {"name": "American Samoa", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AR": {"name": "Argentina", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AU": {"name": "Australia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AT": {"name": "Austria", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AW": {"name": "Aruba", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IN": {"name": "India", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AX": {"name": "Aland Islands", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "AZ": {"name": "Azerbaijan", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "IE": {"name": "Ireland", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "ID": {"name": "Indonesia", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "UA": {"name": "Ukraine", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "QA": {"name": "Qatar", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}},
   "MZ": {"name": "Mozambique", "iso": { "3166": { "1": { "alpha": { "2": "" } } }}}
};

var countries = [];

Object.keys(countriesObj).forEach(function(country){
  countriesObj[country].iso['3166']['1']['alpha']['2'] = country;
  countries.push({
      'id': ObjectId(),
      'iso': countriesObj[country].iso,
      'name': countriesObj[country].name,
  });
});


// Get all from the db
var countriesISOALPHA2 = [];

db.createReadStream({keyEncoding: 'utf8',valueEncoding: 'json',sync: true})
  .on('data', function (data) {
    console.log(data.key, '=', data.value);
    countriesISOALPHA2.push(data.value.iso['3166']['1']['alpha']['2']);
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed');

    // Loop into the created users array
    countries.forEach(function(country, index){

      // Insert the user when the username doesn't exist
      if( countriesISOALPHA2.indexOf(country.iso['3166']['1']['alpha']['2'])<0 ){

        console.log('NOT FOUND: ', country.iso['3166']['1']['alpha']['2']);

        db.put(country.id, country, {keyEncoding: 'utf8',valueEncoding: 'json',sync: true},function (err) {
          
          if (err){ // some kind of I/O error
            console.log(err);
          }else{
            console.log('ADDED', country);
          }

        })
      
      }else{
        console.log('EXIST', country.iso['3166']['1']['alpha']['2']);
      }

    });

  })
  .on('end', function () {
    console.log('Stream end');
  })
  