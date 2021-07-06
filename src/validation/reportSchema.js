import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const createReportSchema = Joi.object({
  impl: JoiValidator.validArray().required(),
  gov: JoiValidator.validArray().required(),
  // govfeedback: JoiValidator.validateString(),
  impfeedback: JoiValidator.validateString(),
});

const updateReportSchema = Joi.object({
  impl: JoiValidator.validArray(),
  gov: JoiValidator.validArray(),
  govfeedback: JoiValidator.validateString(),
  impfeedback: JoiValidator.validateString(),
});

export { createReportSchema, updateReportSchema };
