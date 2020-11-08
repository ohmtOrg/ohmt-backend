import { Feedback } from '../models/feedback';
import response from '../utils/response';

/**
 * user signup controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const createFeedback = async (req, res) => {
  try {
    const createdBy = req.decoded._id;
    const doc = await Feedback.create({ ...req.body, createdBy });

    return response(res, 200, 'success', doc);
  } catch (error) {
    return response(res, 500, 'error', { errors: error.message });
  }
};

/**
 * update user details
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description updates details of logged in user
 */
const updateFeedbackDetails = async (req, res) => {
  try {
    const { feedbackId } = req.param;
    const updatedFeedback = await Feedback.findOneAndUpdate(
      { _id: feedbackId },
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    return response(res, 202, 'success', {
      updatedFeedback,
    });
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

export default {
  createFeedback,
  updateFeedbackDetails,
};
