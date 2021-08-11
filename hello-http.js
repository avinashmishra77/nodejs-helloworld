var http = require('http');
var port = 8000;
var laddr = '0.0.0.0';
http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Hello World, from ' + process.version + '!\n');
   console.log('Processed request for '+ req.url);
}).listen(port, laddr);
console.log('Server running at http://' + laddr + ':' + port + '/');