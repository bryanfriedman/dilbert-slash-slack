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

  var jsonResponse =
  {
      "parse": "full",
      "response_type": "in_channel",
      "text": "",
      "attachments":[
          {
              "image_url": ""
          }
      ],
      "unfurl_media":true,
      "unfurl_links":true
  }

  var errorResponse =
  {
      "text": "No comics could be found that match that search query."
  }


  var query = req.query.text;

  if (query != null && query != "") {
    var request = require('request');
    var cheerio = require('cheerio');
    var links = [];
    request('http://dilbert.com/search_results?terms='+encodeURIComponent(query), function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('.img-comic-link').each(function(i, element){
          var a = $(this).attr('href');
          links[i] = a;
        });
      }
      if (links.length == 0) {
        res.setHeader('content-type', 'application/json');
        res.send(errorResponse);
      }
      else {
        var link = links[Math.floor(Math.random()*links.length)];
        res.setHeader('content-type', 'application/json');
        jsonResponse.text = link;
        jsonResponse.attachments[0].image_url = link;
        res.send(jsonResponse);
      }
    });
  }
  else {
    var stripDate = stripDates[Math.floor(Math.random()*stripDates.length)];
    res.setHeader('content-type', 'application/json');
    jsonResponse.text = "http://dilbert.com/strip/" + stripDate;
    jsonResponse.attachments[0].image_url = "http://dilbert.com/strip/" + stripDate;
    res.send(jsonResponse);
  }

});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Dilbert Slash Slack app listening at http://%s:%s', host, port);
});
