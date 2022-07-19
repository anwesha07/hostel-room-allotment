const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const logFilePath = process.env.LOG_FILE_PATH
  || path.join(path.resolve(__dirname, '../..'), 'access.log');

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(logFilePath, {
  flags: 'a',
});

const logger = morgan('combined', { stream: accessLogStream });

module.exports = logger;
