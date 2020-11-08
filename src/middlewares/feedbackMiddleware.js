import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import { Feedback } from '../models/feedback';

const { Feedback } = models;
const { getById } = DbServices;

/**
 * @method checkFeedbackId
 * @param {object} req request object
 * @param {object} res request object
 * @param {function} next next function
 * @returns {object} custom response
 * @description checks if feedbackId passed to params is valid
 */
export const checkFeedbackId = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await Feedback.getById(feedbackId);
    if (!feedback) {
      return response(res, 404, 'error', {
        message: messages.notExistFeedback,
      });
    }
    req.feedback = feedback;
    return next();
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};
