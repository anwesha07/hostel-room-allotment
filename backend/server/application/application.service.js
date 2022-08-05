const applicationRepository = require('./application.repository');
const BadRequestException = require('../utils/errors/BadRequestException');

/* eslint-disable no-underscore-dangle */
const saveNewApplication = async (applicationDetails, currentUser) => {
  const application = await applicationRepository.findApplicationByUserId(currentUser._id);
  if (application) {
    throw new BadRequestException('Application already exists');
  }
  const newApplication = await applicationRepository.saveApplication({
    ...applicationDetails,
    user: currentUser,
  });
  return newApplication;
};

module.exports = {
  saveNewApplication,
};
