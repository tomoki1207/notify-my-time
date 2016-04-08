var http = require('http');
var url = require('url');
var fs = require('fs');

var returnhome = function(req, res) {
  fs.readFile('./html/returnhome.html', function(err, data) {
    if (err) {
      throw err;
    }
    var query = url.parse(req.url, true).query;
    var hour = query.hasOwnProperty('hour') && !isNaN(query.hour) ? query.hour : 1;
    var min = query.hasOwnProperty('min') && !isNaN(query.min) ? query.min : 0;

    var html = data.toString();
    html = html.replace(/%%hour%%/g, hour);
    html = html.replace(/%%min%%/g, min);
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(html);
    res.end();
  });
};

var route = {
  '/returnhome': returnhome,
};

http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  if (typeof route[pathname] === 'function') {
    route[pathname](req, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end();
  }
}).listen(process.env.PORT || 8888);
