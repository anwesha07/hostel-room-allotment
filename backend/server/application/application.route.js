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

applicationRouter.get(
  '/',
  userMiddleware.userAuthMiddleware,
  userMiddleware.adminAuthMiddleware,
  applicationController.viewApplicationList,
);

applicationRouter.get(
  '/status',
  userMiddleware.userAuthMiddleware,
  applicationController.viewApplicationStatus,
);

applicationRouter.put(
  '/verify/:id',
  userMiddleware.userAuthMiddleware,
  userMiddleware.adminAuthMiddleware,
  applicationController.verifyApplication,
);

module.exports = applicationRouter;
