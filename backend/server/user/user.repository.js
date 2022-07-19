const userDb = [
  {
    id: 1,
    name: 'Bob Marley',
    age: 100,
    email: 'marley@harleydavidson.com',
  },
];

const findAllUsers = () => new Promise((resolve) => resolve(userDb));

const findUserById = (id) => new Promise((resolve) => {
  resolve(userDb.find((user) => user.id === parseInt(id, 10)));
});

const createUser = (userDetails) => {
  const lastUserId = userDb[userDb.length - 1]?.id || 0;
  const id = lastUserId + 1;
  const newUserDetails = { id, ...userDetails };
  userDb.push(newUserDetails);
  return new Promise((resolve) => {
    resolve(newUserDetails);
  });
};

const updateUserById = (id, userDetails) => {
  const idx = userDb.findIndex((user) => user.id === parseInt(id, 10));
  if (idx === -1) return null;
  const updatedUserDetails = {
    id,
    ...userDb[idx],
    ...userDetails,
  };
  userDb[idx] = updatedUserDetails;
  return new Promise((resolve) => {
    resolve(updatedUserDetails);
  });
};

const deleteUserById = (id) => {
  const idx = userDb.findIndex((user) => user.id === parseInt(id, 10));
  if (idx === -1) return null;
  const userDetails = userDb[idx];
  userDb.splice(idx, 1);
  return new Promise((resolve) => {
    resolve(userDetails);
  });
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
