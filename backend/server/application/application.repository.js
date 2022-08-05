/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const User = require('../user/user.repository');

const applicationSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.ObjectId,
    ref: User,
  },
  status: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'ALLOTTED'],
    default: 'PENDING',
  },
});

const Application = mongoose.model('Application', applicationSchema);

const findApplicationByUserId = (userId) => Application.findOne({ user: userId }).select('-__v').populate('user', '-__v -password');

const saveApplication = (applicationDetails) => {
  const application = new Application(applicationDetails);
  return application.save();
};

module.exports = Application;
module.exports.findApplicationByUserId = findApplicationByUserId;
module.exports.saveApplication = saveApplication;
