const Joi = require('joi');

const BadRequestException = require('../utils/errors/BadRequestException');

// For new application creation validattion
const saveApplicationValidationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    transactionId: Joi.string()
      .alphanum()
      .min(10)
      .max(12)
      .required(),

    transactionDate: Joi.date()
      .required(),

    isDisabled: Joi.boolean().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    next(new BadRequestException(error.details[0].message));
    return;
  }
  req.body = value;
  next();
};

module.exports = {
  saveApplicationValidationMiddleware,
};
