import response from '../utils/response';
import { verifyToken } from '../utils/authHelper';

/**
 * mail controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const verifyEmail = async (req, res) => {
  try {
    const { _id } = await verifyToken(req.params.token);
    await FindOneAndUpdate(_id, { verified: true });
    return res.redirect(process.env.FRONTEND_BASE_URL);
  } catch (error) {
    const rescode = error.name === 'JsonWebTokenError' ? 403 : 500;
    return response(res, rescode, 'error', { error });
  }
};

export default {
  verifyEmail,
};
