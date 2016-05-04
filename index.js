var express = require('express');
var app = express();

var stripDates = [

'2009-12-08',
'2001-04-29',
'2011-09-09',
'2011-10-09',
'1995-02-13',
'2001-08-12',
'1997-11-23',
'2003-07-03',
'2012-10-20',
'2010-07-25',
'2015-09-27',
'2004-07-03'

]


app.get('/', function (req, res) {
  var stripDate = stripDates[Math.floor(Math.random()*items.length)]; =
  res.send('http://dilbert.com/strip/' + stripDate);
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
