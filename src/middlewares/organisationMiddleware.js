import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import models from '../models';

const { Org } = models;
const { getById } = DbServices;

/**
 * @method checkOrgId
 * @param {object} req request object
 * @param {object} res request object
 * @param {function} next next function
 * @returns {object} custom response
 * @description checks if orgId passed to params is valid
 */
export const checkOrgId = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const org = await getById(Org, orgId, {});
    if (!org) {
      return response(res, 404, 'error', {
        message: messages.notExistOrg,
      });
    }
    req.org = org;
    return next();
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};
