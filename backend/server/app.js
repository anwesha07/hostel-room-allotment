const express = require('express');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const loggerMiddleware = require('./middlewares/logger');
const apiRoutes = require('./routes');

const port = process.env.PORT || 3000;
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

if (!jwtPrivateKey) {
  console.log('FATAL ERROR: JWT_PRIVATE_KEY not defined in env');
  process.exit(1);
}

const startApp = () => {
  const app = express();

  // Route for health check
  app.get('/', (req, res) => {
    res.send('AoK!');
  });

  // Mounting a middleware so that req.body can be parsed as JSON
  app.use(express.json());

  // Mounting all the aggregated routes, so any API calls starting with /api
  // will be searched inside apiRoutes and will be routed based on the path
  app.use('/api', apiRoutes);

  // Mounting a custom middleware to log all the requests
  app.use(loggerMiddleware);

  // Mounting global error handler so that any missed error handling is handled
  app.use(globalErrorHandler);

  const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}...`);
  });
};

module.exports = startApp;
