/* 
    These two are the same
    - npm i nodemon --save-dev
    - npm i nodemon -D

    - npm i date-fns

    - npm start
    - npm run dev

    Production Dependency
    - npm i uuid

    - npm i uuid@8.3.1
    - npm update

    Uninstall Dependencies
    - npm uninstall
    - npm un
    - npm rm

    More Examples for Uninstall Dependencies
    - npm rm nodemon -D
    - npm rm nodemon -g
    - npm rm nodemon

    If you uninstall a dependency, it doesn't automatically changes the script.
    So that could be an issue, and you probably want to check for that as well.
 */

// NPM
const { format } = require("date-fns");
const { v4:uuid } = require("uuid");

// Common Core Modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

async function logEvents(message, file) {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    try {
        if (!fs.existsSync(path.join(__dirname, "logs")))
            await fsPromises.mkdir(path.join(__dirname, "logs"));

        /* 
            We initially got an error w/out using fs saying:
            Error: ENOENT: no such file or directory, open
            
            This is because appendFile will createhe if it does not exist,
            but not the directory.
         */
        await fsPromises.appendFile(path.join(__dirname, "logs", file), logItem);
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = logEvents;