const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (request, response) => {
  // response.send('Hello World');
  // response.sendFile('./views/index.html', { root: __dirname });
  response.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/new-page(.html)?', (request, response) => {
  response.sendFile(path.join(__dirname, '../', 'views', 'new-page.html'));
});

router.get('/old-page(.html)?', (request, response) => {
  /*
      By default, Express sends a response code of 302 - "Moved Temporarily".
      But what we really want is 301 - Permanent Redirect
   */
  response.redirect(301, 'new-page.html');
});

module.exports = router;