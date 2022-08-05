/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  registrationNumber: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 10,
    unique: true,
  },
  course: {
    type: String,
    enum: ['BTech', 'MCA', 'MBA', 'MTech'],
  },
  semester: {
    type: Number,
    min: 1,
    max: 8,
  },
  email: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 5,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateToken = function generateToken() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY,
  );
  return token;
};

const User = mongoose.model('User', userSchema);

const countUserByEmail = (email) => User.count({ email });

const getUser = (registrationNumber) => User.findOne({ registrationNumber }).select('-__v');

const getUserById = (id) => User.findById(id).select('-__v -password');

const saveUser = (userDetails) => {
  const user = new User(userDetails);
  return user.save();
};

module.exports = User;
module.exports.saveUser = saveUser;
module.exports.countUserByEmail = countUserByEmail;
module.exports.getUser = getUser;
module.exports.getUserById = getUserById;
