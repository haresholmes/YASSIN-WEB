const http = require('http');
const fs = require('fs');
const path = require('path');

// Create server
http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Serve insurance data JSON
        if (req.url === '/api/insurance') {
            fs.readFile(path.join(__dirname, 'insurance.json'), 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Failed to load insurance data' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(data);
                }
            });
        }
        // Serve HTML, CSS, and JavaScript files
        else {
            const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
            const extname = path.extname(filePath);
            const contentType = extname === '.html' ? 'text/html' :
                                extname === '.css' ? 'text/css' :
                                extname === '.js' ? 'application/javascript' :
                                'text/plain';

            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 - Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                }
            });
        }
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});