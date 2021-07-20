import { Report } from '../models/report';
import response from '../utils/response';

/**
 * user signup controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const createReport = async (req, res) => {
  try {
    // console.log("in controller ",req.body)
    const createdBy = req.payload.user._id;
    const doc = await Report.create({ ...req.body, createdBy });

    return response(res, 200, 'success', doc);
  } catch (error) {
    console.log(error);
    return response(res, 500, 'error', { errors: error.message });
  }
};
const getAllReports = async (req, res) => {
  try {
    // const doc = await Report.find().populate('createdBy');

    const doc = await Report.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'author',
        },
      },
    ]);

    return response(res, 200, 'success', doc);
  } catch (error) {
    console.log(error);
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
const updateReportDetails = async (req, res) => {
  try {
    const { reportId } = req.param;
    const updatedReport = await Report.findOneAndUpdate(
      { _id: reportId },
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    return response(res, 202, 'success', {
      updatedReport,
    });
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

export default {
  createReport,
  getAllReports,
  updateReportDetails,
};
