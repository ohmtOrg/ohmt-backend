import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const createReportSchema = Joi.object({
  impl: JoiValidator.validateArray().required(),
  gov: JoiValidator.validateArray().required(),
  govfeedback: JoiValidator.validateString(),
  impfeedback: JoiValidator.validateString(),
});

const updateReportSchema = Joi.object({
  impl: JoiValidator.validateArray(),
  gov: JoiValidator.validateArray(),
  govfeedback: JoiValidator.validateString(),
  impfeedback: JoiValidator.validateString(),
});

export { createReportSchema, updateReportSchema };
