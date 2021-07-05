import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const signUpSchema = Joi.object({
  email: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
  firstName: JoiValidator.validateString().required(),
  lastName: JoiValidator.validateString().required(),
  organisation: JoiValidator.validateString(),
  country: JoiValidator.validateString().required(),
  oneHealth: JoiValidator.validateBoolean().required(),
  region: JoiValidator.validateString().required(),
  countryCode: JoiValidator.validateString().required(),
});

const createAdminSchema = Joi.object({
  email: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
  firstName: JoiValidator.validateString().required(),
  lastName: JoiValidator.validateString().required(),
});

const signInSchema = Joi.object({
  email: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
});

const updateUserSchema = Joi.object({
  userId: JoiValidator.validateUuidV4(),
  firstName: JoiValidator.validateString(),
  lastName: JoiValidator.validateString(),
  organisation: JoiValidator.validateString(),
  country: JoiValidator.validateString(),
});

const emailSchema = Joi.object({
  email: JoiValidator.validateEmail().required(),
});

const passwordSchema = Joi.object({
  password: JoiValidator.validatePassword()
    .min(8)
    .required(),
});

const getUserSchema = Joi.object({
  userId: JoiValidator.validateUuidV4(),
});

const setUserRoleSchema = Joi.object({
  userId: JoiValidator.validateUuidV4().required(),
  role: JoiValidator.validateString()
    .valid('admin', 'normal', 'manager', 'super-admin')
    .required(),
});

export {
  signUpSchema,
  signInSchema,
  updateUserSchema,
  getUserSchema,
  setUserRoleSchema,
  emailSchema,
  passwordSchema,
  createAdminSchema,
};
