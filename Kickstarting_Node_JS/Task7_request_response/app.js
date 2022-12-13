
const http = require('http'); 

const server = http.createServer((req,res) => {
    const url = req.url;
    res.setHeader('Content-Type','text/html');
    if(url === '/home'){
        res.write('<html>');
        res.write('<head><title>home</title></head>');
        res.write('<body><h1>Welcome Home</h1></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/about'){
        res.write('<html>');
        res.write('<head><title>about us</title></head>');
        res.write('<body><h1>Welcome to About Us page</h1></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/node'){
        res.write('<html>');
        res.write('<head><title>node</title></head>');
        res.write('<body><h1>Welcome to my node js project</h1></body>');
        res.write('</html>');
        return res.end();
    }
	res.write('<html>');
	res.write('<head><title>my first page</title></head>');
	res.write('<body><h1>Hello from node js server</h1></body>');
	res.write('</html>');
	res.end();
});

server.listen(3000);