// Third-Party Middleware
// Cross-Origin Resource Sharing
// If you have an open to the public API, cors() would be fine.
// But for many applications, you'd want a whitelist.
const whitelist = [
  'https://www.teriz-de-ocampo.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            // (1) Error - there's no error
            // (2) true - the origin will be sent back. Yes, that's the same origin, and it is allowed.
            callback(null, true,)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;