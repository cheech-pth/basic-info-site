const http = require("http");
const fs = require("fs");
const path = require("path");

// Function for routing URL paths
function routing(res, urlPath) {
    let filePath = path.join(`${__dirname + urlPath}.html`)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (!err) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        } else {
            console.error("Error: ", err)
            res.statusCode = 500;
            res.end();
        }
    })
}

http.createServer((req, res) => {
    // Routing for URL Paths
    switch (req.url) {
        case '/': 
            routing(res, "/index")
            break;
        case '/about':
            routing(res, req.url)
            break;
        case '/contact-me':
            routing(res, req.url)
            break;
        default: // Handle all other cases where file does not exist, 404 page
            routing(res, "/404");
            break;
    }
}).listen(3000, () => console.log('Server is running'));
