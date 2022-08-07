const fs = require("fs");

if (!fs.existsSync("./version-2")) {
    fs.mkdir("./version-2", error => {
        if (error) throw error;
        console.log("Directory Created");
    });
}
    
if (fs.existsSync("./version-2")) {
    fs.rmdir("./version-2", error => {
        if (error) throw error;
        console.log("Directory Removed");
    });
}
