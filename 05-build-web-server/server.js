const logEvents = require("./log-events");

// Events Common Core Module
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const EventEmitter = require("events");
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();
myEmitter.on("log", (message, file) => logEvents(message, file));

async function serveFile(filePath, contentType, response) {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes("image") ? "utf8" : ""
        );
        const data = contentType === "application/json"
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes("404") ? 400 : 200,
            { "Content-Type": contentType }
        );
        response.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        );
    }
    catch (error) {
        console.error(error);
        myEmitter.emit("log", `${error.name}: ${error.message}`, "error-log.txt");
        response.statusCode = 500;
        response.end();
    }
}

/* 
    css/*, data/*, img/*, and so on
    We're going to serve all of these different file types or content types from the server.
 */
const PORT = process.env.PORT || 3500;
const server = http.createServer((request, response) => {
    console.log(request.url, request.method);
    myEmitter.emit("log", `${request.url}\t${request.method}`, "request-log.txt");

    // What we could do is build a path, and serve the file.
    // This is NOT what we'll want to do.
    // This is not efficient bec. we will have a statement for every address that came in.
    // Same thing with using a switch statement because it's not dynamic.
    /* 
        let filePath;
        if (request.url === "/" || request.url === "index.html") {
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/html");
            filePath = path.join(__dirname, "views", "index.html");
            fs.readFile(filePath, "utf8", (error, data) => {
                response.end(data);
            });
        }
     */
    
    const extension = path.extname(request.url);
    let contentType;

    switch (extension) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".txt":
            contentType = "text/plain";
            break;
        default:
            contentType = "text/html";
            break;
    }

    let filePath =
        contentType === "text/html" && request.url === "/"
            ? path.join(__dirname, "views", "index.html")
            : contentType === "text/html" && request.url.slice(-1) === "/"
                ? path.join(__dirname, "views", request.url, "index.html")
                : contentType === "text/html"
                    ? path.join(__dirname, "views", request.url)
                    : path.join(__dirname, request.url);
    
    if (!extension && request.url.slice(-1) !== "/") filePath += ".html";

    const fileExists = fs.existsSync(filePath);
    if (fileExists)
        serveFile(filePath, contentType, response);
    else {
        switch (path.parse(filePath).base) {
            case "old-page.html": // 301 redirect
                response.writeHead(301, {"Location": "/new-page.html"});
                response.end();
                break;
            case "www-page.html":
                response.writeHead(301, {"Location": "/"});
                response.end();
                break;
            default: // 404
                serveFile(path.join(__dirname, "views", "404.html"), "text/html", response);
                break;
        }
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));