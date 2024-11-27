const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceHTML = require('./Modules/replaceHTML'); 

const html = fs.readFileSync("./Files/index.html", "utf-8");
const productlist = fs.readFileSync("./Files/product-list.html", "utf-8");
const products = JSON.parse(fs.readFileSync("./Data/Product.json", "utf-8"));


const productHtmlArray = products.map((prod) => replaceHTML(productlist, prod));

const server = http.createServer((req, res) => {
    let { query, pathname: path } = url.parse(req.url, true);

    if (path === "/" || path === "/home") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{CONTENT}}", 'You are in home page'));
    } 
    else if (path === "/product") {
        if (query.id) {
            const product = products.find((p) => p.id == query.id);
            if (product) {
                const productHtml = replaceHTML(productlist, product);
                res.writeHead(200, { "content-type": "text/html" });
                res.end(productHtml);
            } else {
                res.writeHead(404, { "content-type": "text/plain" });
                res.end("Product not found");
            }
        } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(html.replace("{{CONTENT}}", productHtmlArray.join("")));
        }
    } 
    else if (path === "/contact") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{CONTENT}}", 'You are in contact page'));
    } 
    else if (path === "/about") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{CONTENT}}", 'You are in about page'));
    } 
    else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end(html.replace("{{CONTENT}}", 'Page not found'));
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Server started on http://127.0.0.1:8000/");
});
