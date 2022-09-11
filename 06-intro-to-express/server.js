const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

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
app.get('/*', (request, response) => {
    response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));