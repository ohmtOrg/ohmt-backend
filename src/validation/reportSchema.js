import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const createReportSchema = Joi.object({
  data: JoiValidator.validateArray().required(),
});

const updateReportSchema = Joi.object({
  data: JoiValidator.validateArray(),
});

export { createReportSchema, updateReportSchema };
