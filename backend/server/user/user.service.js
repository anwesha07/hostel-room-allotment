const userRepository = require('./user.repository');
const NotFoundException = require('../utils/errors/NotFoundException');

const getAllUsers = () => userRepository.findAllUsers();

const createUser = (userDetails) => userRepository.createUser(userDetails);

const getUserById = async (id) => {
  const userToFind = await userRepository.findUserById(id);
  if (!userToFind) {
    throw new NotFoundException(`No user found with id ${id}`);
  }
  return userToFind;
};

const updateUserById = async (id, userDetails) => {
  const updatedUserDetails = await userRepository.updateUserById(id, userDetails);
  if (!updatedUserDetails) {
    throw new NotFoundException(`No user found with id ${id}`);
  }
  return updatedUserDetails;
};

const deleteUserById = async (id) => {
  const deletedUserDetails = await userRepository.updateUserById(id);
  if (!deletedUserDetails) {
    throw new NotFoundException(`No user found with id ${id}`);
  }
  return deletedUserDetails;
};

module.exports = { getAllUsers, createUser, getUserById, updateUserById, deleteUserById };
