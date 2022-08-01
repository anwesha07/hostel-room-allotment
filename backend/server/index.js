require('dotenv').config();

const startApp = require('./app');
const startDb = require('./db');

startApp();
startDb();
