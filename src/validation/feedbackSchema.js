import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const createFeedbackSchema = Joi.object({
  notes: JoiValidator.validateString().required(),
  reportId: JoiValidator.validateString().required(),
});

const updateFeedbackSchema = Joi.object({
  notes: JoiValidator.validateString(),
  reportId: JoiValidator.validateString(),
});

export { createFeedbackSchema, updateFeedbackSchema };
