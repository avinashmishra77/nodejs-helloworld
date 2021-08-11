# nodejs-helloworld

## Development environment setup (Laptop)

Make sure you have Node.js intalled, if not install using:

sudo yum install nodejs

## Hello world app

```nodejs
var http = require('http');
var port = 8000;
var laddr = '0.0.0.0';
http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Hello World, from ' + process.version + '!\n');
   console.log('Processed request for '+ req.url);
}).listen(port, laddr);
console.log('Server running at http://' + laddr + ':' + port + '/');
```

## Trigger

**Note:**

Since using GitHub free account there might be Rate limiting to the number of API requests you can make, refer [Rate limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).

For unauthenticated requests, the rate limit allows for up to 60 requests/hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.

The returned HTTP headers of any API request show your current rate limit status:

```bash
curl -I https://api.github.com/users/avinashmishra77
```
