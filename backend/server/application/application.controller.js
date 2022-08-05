const asyncWrap = require('../utils/asyncWrap');

const applicationService = require('./application.service');

const createNewApplication = asyncWrap(async (req, res) => {
  const applicationDetails = req.body;
  const currentUser = req.user;
  const application = await applicationService.saveNewApplication(applicationDetails, currentUser);
  res.status(201).send({
    status: 'success',
    application,
  });
});

module.exports = {
  createNewApplication,
};
