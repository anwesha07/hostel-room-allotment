const Joi = require('joi');
const BadRequestException = require('../utils/errors/BadRequestException');

const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z ]{3,30}$'))
    .required(),
  age: Joi.number().min(1).max(120).required(),
  email: Joi.string().email(),
});

const createUserValidationMiddleware = (req, res, next) => {
  const { error, value } = createUserSchema.validate(req.body);
  if (error) return next(new BadRequestException(error.message));
  req.body = value;
  return next();
};

const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z ]{3,30}$')),
  age: Joi.number().min(1).max(120),
  email: Joi.string().email(),
});

const updateUserValidationMiddleware = (req, res, next) => {
  const { error, value } = updateUserSchema.validate(req.body);
  if (error) return next(new BadRequestException(error.message));
  req.body = value;
  return next();
};

module.exports = {
  createUserValidationMiddleware,
  updateUserValidationMiddleware,
};
