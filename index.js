//importing node framework
var express = require('express');

// Constants

const PORT = 8080;
const HOST = '0.0.0.0';
 
var app = express();//Respond with "hello world" for requests that hit our root "/"

app.get('/', function (req, res) {
 res.send('hello world');
});//listen to port 3000 by default

//app.listen(process.env.PORT || 3000);
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

//module.exports = app;

// var http = require('http');
// var port = 8000;
// var laddr = '0.0.0.0';
// http.createServer(function (req, res) {
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('Hello World, from ' + process.version + '!\n');
//    console.log('Processed request for '+ req.url);
// }).listen(port, laddr);
// console.log('Server running at http://' + laddr + ':' + port + '/');