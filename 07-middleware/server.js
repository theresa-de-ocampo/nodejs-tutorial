const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/log-events');
const errorHandler = require('./middleware/error-handler');
const PORT = process.env.PORT || 3500;

// Custom Middleware Logger
app.use(logger);

// Third-Party Middleware
// Cross-Origin Resource Sharing
// If you have an open to the public API, cors() would be fine.
// But for many applications, you'd want a whitelist.
const whitelist = ['https://www.teriz-de-ocampo.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
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
app.use(cors(corsOptions));

/* 
    Built-in middleware to handle urlencoded data
    In other words, form data:
    'content-type: application/x-www-form-urlencoded'

    The ff. applies to all routes as it comes in.
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files like images, and styles.
// Express will automatically route those files since this is applied before our other routes.
// So it will search within the public directory for the request, before it moves to these other routes.
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (request, response) => {
    // response.send('Hello World');
    // response.sendFile('./views/index.html', { root: __dirname });
    response.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (request, response) => {
    /*
        By default, Express sends a response code of 302 - "Moved Temporarily".
        But what we really want is 301 - Permanent Redirect
     */
    response.redirect(301, 'new-page.html');
});

// These anonymous functions following the get route are "Route Handlers", and we can chain those.
app.get('/hello(.html)?', (request, response, next) => {
    console.log('attempted to load hello.html');

    // It moves on to the next handler.
    // It's not very common, but you can just put it the comma. And just put in the next function afterwards.
    next()
}, (request, response) => {
    response.send('Hello World!');
});

// Another way of how you might see functions chained together - more common.
const one = (request, response, next) => {
    console.log('one');
    next();
}

const two = (request, response, next) => {
    console.log('two');
    next();
}

const three = (request, response, next) => {
    console.log('three');
    response.send('Finished!');
}

// These route handlers works in a way that is very similar to what we would call middleware.
app.get('/chain(.html)?', [one, two, three]);

// Express handles routes like a waterfall.
// So at the very end, you can eseentially put in your default.
/* app.get('/*', (request, response) => {
    response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}); */

app.all('*', (request, response) => {
    response.status(404);
    
    // Check Content-Type
    if (request.accepts('html'))
        response.sendFile(path.join(__dirname, 'views', '404.html'));
    else if (request.accepts('json'))
        response.json({ error: '404 Not Found'});
    else
        response.type('text').send('404 Not Found');
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));