const express = require('express');

const applicationController = require('./application.controller');
const applicationMiddleware = require('./application.middleware');
const userMiddleware = require('../user/user.middleware');

const applicationRouter = express.Router();

applicationRouter.post(
  '/',
  userMiddleware.userAuthMiddleware,
  applicationMiddleware.saveApplicationValidationMiddleware,
  applicationController.createNewApplication,
);

module.exports = applicationRouter;
