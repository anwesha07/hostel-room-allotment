/* eslint-disable no-underscore-dangle */
const applicationRepository = require('./application.repository');
const BadRequestException = require('../utils/errors/BadRequestException');
const NotFoundException = require('../utils/errors/NotFoundException');

const saveNewApplication = async (applicationDetails, userId) => {
  const application = await applicationRepository.findApplicationByUserId(userId);
  if (application) {
    throw new BadRequestException('Application already exists');
  }
  const newApplication = await applicationRepository.saveApplication({
    ...applicationDetails,
    user: userId,
  });
  return newApplication;
};

const viewApplicationStatus = async (userId) => {
  const application = await applicationRepository.findApplicationByUserId(userId);
  if (!application) {
    throw new NotFoundException('Application does not exist');
  }
  return application;
};

const listApplications = (status) => applicationRepository.listApplications(status);

const verifyPendingApplication = async (applicationId) => {
  const application = await applicationRepository.findApplicationById(applicationId);
  if (application.status !== 'PENDING') {
    throw new BadRequestException('Application status should be PENDING');
  }
  return applicationRepository.updateApplicationStatusById(applicationId, 'VERIFIED');
};

module.exports = {
  saveNewApplication,
  viewApplicationStatus,
  listApplications,
  verifyPendingApplication,
};
