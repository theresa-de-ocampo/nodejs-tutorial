const fs = require("fs");
const path = require("path");

/*
    [METHOD 1]
fs.readFile("./files/starter.txt", (error, data) => {
    if (error) throw error;
    console.log(data.toString());
});
*/

/* 
    [METHOD 2]
fs.readFile("./files/starter.txt", "utf8", (error, data) => {
    if (error) throw error;
    console.log(data);
});

 */

fs.readFile(path.join(__dirname, "files", "starter.txt"), "utf8", (error, data) => {
    if (error) throw error;
    console.log(data);
});

/*
    Controlling Flow
    [METHOD 1] - Callback Hell
fs.writeFile(path.join(__dirname, "files", "reply.txt"), "This is my 2nd try of writing.", (error) => {
    if (error) throw error;
    console.log("Write Complete");

    fs.appendFile(
        path.join(__dirname, "files", "reply.txt"), "\nThis is my 5th try of writing.",
        (error) => {
            if (error) throw error;
            console.log("Append Complete");

            fs.rename(
                path.join(__dirname, "files", "reply.txt"),
                path.join(__dirname, "files", "new-reply.txt"),
                (error) => {
                    if (error) throw error;
                    console.log("Rename Complete");
                }
            );
        }
    );
    
});
*/

console.log("This will print first before the file contents.");
console.log(__dirname);

// Exit on Uncaught Errors
process.on("uncaughtException", error => {
    console.error(`There was an uncaught error: ${error}`);
    process.exit(1);
})