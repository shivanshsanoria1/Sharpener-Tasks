const http = require('http'); 

const routes = require('./routes');

//single export
const server = http.createServer(routes);

//multiple exports
/* const server = http.createServer(routes.handler);
console.log(routes.someText); */

server.listen(3000);