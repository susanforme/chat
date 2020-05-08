var https = require('https');
var fs = require('fs');
var path = require('path');

const cert = fs.readFileSync(path.join(__dirname, './cert/cert.pem'));
const key = fs.readFileSync(path.join(__dirname, './cert/key.pem'));
const options = { key, cert };
https
  .createServer(options, function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World');
  })
  .listen(8081);

console.log('Server running at https://127.0.0.1:8081/');
