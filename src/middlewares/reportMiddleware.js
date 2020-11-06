import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import models from '../models';

const { Report } = models;
const { getById } = DbServices;

/**
 * @method checkReportId
 * @param {object} req request object
 * @param {object} res request object
 * @param {function} next next function
 * @returns {object} custom response
 * @description checks if reportId passed to params is valid
 */
export const checkReportId = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const report = await getById(Report, reportId, {});
    if (!report) {
      return response(res, 404, 'error', {
        message: messages.notExistReport,
      });
    }
    req.report = report;
    return next();
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};
