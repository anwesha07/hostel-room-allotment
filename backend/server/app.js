const express = require('express');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const loggerMiddleware = require('./middlewares/logger');
const apiRoutes = require('./routes');

const port = process.env.PORT || 3000;

const startApp = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('AoK!');
  });

  app.use(express.json());

  app.use(loggerMiddleware);

  app.use('/api', apiRoutes);

  app.use(globalErrorHandler);

  const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}...`);
  });
};

module.exports = startApp;
