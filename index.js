//importing node framework
var express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
 
var app = express();

//Respond with "hello world" for requests that hit our root "/"
app.get('/', function (req, res) {
 res.send('hello world');
});//listen to port 3000 by default

app.listen(PORT, HOST);
module.exports = app;
console.log(`Running on http://${HOST}:${PORT}`);