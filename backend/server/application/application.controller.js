/* eslint-disable no-underscore-dangle */
const asyncWrap = require('../utils/asyncWrap');

const applicationService = require('./application.service');

const createNewApplication = asyncWrap(async (req, res) => {
  const applicationDetails = req.body;
  const currentUserId = req.user._id;
  const application = await applicationService.saveNewApplication(
    applicationDetails, currentUserId,
  );
  res.status(201).send({
    status: 'success',
    application,
  });
});

const viewApplicationStatus = asyncWrap(async (req, res) => {
  const currentUserId = req.user._id;
  const application = await applicationService.viewApplicationStatus(currentUserId);
  res.status(200).send({
    status: 'success',
    application,
  });
});

const viewApplicationList = asyncWrap(async (req, res) => {
  const { status } = req.query;
  const applications = await applicationService.listApplications(status);
  res.status(200).send({
    status: 'success',
    applications,
  });
});

const verifyApplication = asyncWrap(async (req, res) => {
  const { id: applicationId } = req.params;
  await applicationService.verifyPendingApplication(applicationId);
  res.status(204).send();
});

module.exports = {
  createNewApplication,
  viewApplicationStatus,
  viewApplicationList,
  verifyApplication,
};
