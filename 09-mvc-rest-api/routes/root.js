const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (request, response) => {
  // response.send('Hello World');
  // response.sendFile('./views/index.html', { root: __dirname });
  response.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

module.exports = router;