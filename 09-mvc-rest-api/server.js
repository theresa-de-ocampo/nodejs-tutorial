const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/cors-options');
const { logger } = require('./middleware/log-events');
const errorHandler = require('./middleware/error-handler');
const PORT = process.env.PORT || 3500;

app.use(logger);
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

app.use('/', require('./routes/root'));
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