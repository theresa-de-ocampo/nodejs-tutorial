// How NodeJS differs from Vanilla JS
// 1. Node runds on a server - not in a browser (back-end, not front-end).
// 2. The console is the terminal window.

// 3. Global object instead of window object.
//    clearInterval, clearTimeout, setInterval, setTimeout
console.log("------------ global ------------");
console.log(global);
console.log(" ");

// 4. Has Common Core modules

// 5. CommonJS modules instead of ES6 imports.
console.log("------------ os ------------");
const os = require("os");
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(" ");

console.log("------------ path ------------");
const path = require("path");
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));
console.log(" ");

// There are a couple of other values that we always have access to in node.
console.log("------------ others ------------")
console.log(__dirname);
console.log(__filename);
console.log(" ");

console.log("-------- custom package --------");
const math = require("./math");
console.log(math.add(2, 3));

// 6. Missing some JS APIs like fetch.