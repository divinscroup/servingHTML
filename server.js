const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const PORT = 8080;
const mimeTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpg",
	"png": "image/png",
	"js": "text/javascript",
	"css": "text/css"
};

http.createServer((req, res) => {

    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    fs.readFile(filename, (err,data) => {
        if (err){
            res.writeHead(404, {'Content-type': 'text/html'});
            return res.end('<h1>404 Page Not Found!</h1>');
        }
        let mimeType = mimeTypes[path.extname(filename).split(".").reverse()[0]];
        res.writeHead(200, {'Content-Type': mimeType});
        res.write(data);
        return res.end();
    });
}).listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`)
    }); 