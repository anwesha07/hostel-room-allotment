const asyncWrap = require('../utils/asyncWrap');
const userService = require('./user.service');

const getUsers = asyncWrap(async (_req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).send({ users });
});

const createUser = asyncWrap(async (req, res) => {
  const createdUser = await userService.createUser(req.body);
  res.status(201).send(createdUser);
});

const getUserById = asyncWrap(async (req, res) => {
  const userId = req.params.id;
  const user = await userService.getUserById(userId);
  res.status(200).send(user);
});

const updateUserById = asyncWrap(async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await userService.updateUserById(userId, req.body);
  res.status(200).send(updatedUser);
});

const deleteUserById = asyncWrap(async (req, res) => {
  const userId = req.params.id;
  await userService.deleteUserById(userId);
  res.status(204).send();
});

module.exports = {
  getUsers, createUser, getUserById, updateUserById, deleteUserById,
};
