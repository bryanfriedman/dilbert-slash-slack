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

var port = process.env.PORT || 9000;

app.get('/', function (req, res) {
  var stripDate = stripDates[Math.floor(Math.random()*stripDates.length)];
  res.setHeader('content-type', 'application/json');
  var jsonResponse = 
  {
      "parse": "full",
      "response_type": "in_channel",
      "text": "http://dilbert.com/strip/" + stripDate,
      "attachments":[
          {
              "image_url": "http://dilbert.com/strip/" + stripDate
          }
      ],
      "unfurl_media":true,
      "unfurl_links":true
  }
  res.send(jsonResponse);


});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Dilbert Slash Slack app listening at http://%s:%s', host, port);
});
