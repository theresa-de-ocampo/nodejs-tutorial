const { logEvents } = require('./log-events')

const errorHandler = (err, request, respose, next) => {
  logEvents(`${err.name} ${err.message}`, 'error-log.txt');
  console.error(err.stack);
  respose.status(500).send(err.message);
}

module.exports = errorHandler;