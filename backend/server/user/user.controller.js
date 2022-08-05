const asyncWrap = require('../utils/asyncWrap');
const userService = require('./user.service');

const registerStudent = asyncWrap(async (req, res) => {
  console.log(req.body);
  const registrationData = req.body;
  const token = await userService.registerStudent(registrationData);
  res.status(201).send({
    status: 'success',
    token,
  });
});

const loginUser = asyncWrap(async (req, res) => {
  console.log(req.body);
  const loginData = req.body;
  const token = await userService.loginUser(loginData);
  res.status(200).send({
    status: 'success',
    token,
  });
});

const loginAdminUser = asyncWrap(async (req, res) => {
  const loginData = req.body;
  const token = await userService.loginAdminUser(loginData);
  res.status(200).send({
    status: 'success',
    token,
  });
});

module.exports = {
  registerStudent,
  loginUser,
  loginAdminUser,
};
