const bcrypt = require('bcrypt');
const BadRequestException = require('../utils/errors/BadRequestException');
const ForbiddenException = require('../utils/errors/ForbiddenException');
const userRepository = require('./user.repository');

const registerStudent = async (registrationData) => {
  // check whether another student exists with same email
  const userWithSameEmail = await userRepository.countUserByEmail(registrationData.email);
  if (userWithSameEmail) {
    throw new BadRequestException('An user with same email already exists!');
  }

  // hash password to store
  const hashedPassword = await bcrypt.hash(registrationData.password, 10);
  registrationData.password = hashedPassword;

  // save this data in DB
  const newStudent = await userRepository.saveUser(registrationData);

  // generate and return jwt token
  const token = newStudent.generateToken();
  return token;
};

const loginUser = async (loginData) => {
  // get details of the reqistration number from DB
  const user = await userRepository.getUser(loginData.registrationNumber);
  if (!user) throw new BadRequestException('Invalid registration number or password');

  // compare the password retrieved from DB with the entered password
  const validPassword = await bcrypt.compare(loginData.password, user.password);
  if (!validPassword) throw new BadRequestException('Invalid registration number or password');

  const token = user.generateToken();
  return token;
};

const loginAdminUser = async (loginData) => {
  // Get details of the admin user from DB
  const user = await userRepository.getUserByEmail(loginData.email);
  if (!user) throw new BadRequestException('Invalid email or password');

  // Compare the password retrieved from DB with the entered password
  const validPassword = await bcrypt.compare(loginData.password, user.password);
  if (!validPassword) throw new BadRequestException('Invalid email or password');

  if (!user.isAdmin) throw new ForbiddenException('User does not have admin role');

  const token = user.generateToken();
  return token;
};

module.exports = {
  registerStudent,
  loginUser,
  loginAdminUser,
};
