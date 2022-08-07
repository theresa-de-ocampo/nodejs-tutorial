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
console.log("Nodemon is amazing!");
const { format } = require("date-fns");
console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

/* 
    Alternatives
    const { v4 } = require("uuid");

    const { uuid } = require("uuid");
    console.log(uuid.v4)
 */
const { v4: uuid } = require("uuid");
console.log(uuid());