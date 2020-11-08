import { Org } from '../models/org';
import response from '../utils/response';

/**
 * user signup controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const createOrg = async (req, res) => {
  try {
    const createdBy = req.decoded._id;
    const doc = await Org.create({ ...req.body, createdBy });

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
const updateOrgDetails = async (req, res) => {
  try {
    const { orgId } = req.param;
    const updatedOrg = await Org.findOneAndUpdate({ _id: orgId }, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return response(res, 202, 'success', {
      updatedOrg,
    });
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

export default {
  createOrg,
  updateOrgDetails,
};
