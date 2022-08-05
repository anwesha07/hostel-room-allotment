const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userRepository = require('./user.repository');
const BadRequestException = require('../utils/errors/BadRequestException');
const UnauthorizedException = require('../utils/errors/UnauthorizedException');

// For registration validattion
const userRegistrationValidationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z][a-zA-Z ]+$/)
      .min(1)
      .max(50)
      .required(),

    registrationNumber: Joi.string()
      .alphanum()
      .min(1)
      .max(50)
      .required(),

    course: Joi.string()
      .valid('BTech', 'MCA', 'MBA', 'MTech'),

    semester: Joi.number()
      .integer()
      .min(1)
      .max(8),

    email: Joi.string()
      .email({
        minDomainSegments: 4,
        maxDomainSegments: 4,
        tlds: { allow: ['in'] },
      })
      .required(),

    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),

    confirmPassword: Joi.string()
      .required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    next(new BadRequestException(error.details[0].message));
    return;
  }
  req.body = value;
  next();
};

// To match the password with confirm password and delete the confirm password key from req.body
const confirmPasswordValidationMiddleware = (req, _res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    next(
      new BadRequestException('Password and Confirm Password did not match!'),
    );
    return;
  }
  delete req.body.confirmPassword;
  next();
};

// For Login Validation
const userLoginValidationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    registrationNumber: Joi.string()
      .alphanum()
      .min(1)
      .max(50)
      .required(),

    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),

  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    next(new BadRequestException(error.details[0].message));
    return;
  }
  req.body = value;
  next();
};

const userAuthMiddleware = async (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    next(new UnauthorizedException('No auth token found'));
    return;
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const user = await userRepository.getUserById(_id);
    if (!user) {
      next(new UnauthorizedException('Invalid token'));
    }
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    next(new UnauthorizedException('Invalid token'));
  }
};

module.exports = {
  userRegistrationValidationMiddleware,
  confirmPasswordValidationMiddleware,
  userLoginValidationMiddleware,
  userAuthMiddleware,
};
