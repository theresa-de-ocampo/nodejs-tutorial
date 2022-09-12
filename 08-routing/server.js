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
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

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