import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const createOrgSchema = Joi.object({
  name: JoiValidator.validateString().required(),
  description: JoiValidator.validateString().required(),
});

const updateOrgSchema = Joi.object({
  name: JoiValidator.validateString(),
  description: JoiValidator.validateString(),
});

export { createOrgSchema, updateOrgSchema };
