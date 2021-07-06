import { User } from '../models/user';
import response from '../utils/response';
import messages from '../utils/messages';
import { verifyToken } from '../utils/authHelper';
import stripBearerToken from '../utils/stripBearerToken';

const { userNotFoundId, invalidToken, noToken, serverError } = messages;

/**
 * @method checkUserId
 * @param {object} req request object
 * @param {object} res request object
 * @param {function} next next function
 * @returns {object} custom response
 * @description checks if userId passed to params is valid
 */
export const checkUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.query.userId;
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        console.log('error');
        return response(
          res,
          404,
          'error',
          { message: userNotFoundId },
          { message: userNotFoundId }
        );
      }
      return next();
    }
    return next();
  } catch (error) {
    console.log(error);
    return response(
      res,
      500,
      'error',
      { message: serverError },
      { message: serverError }
    );
  }
};
/**
 * @method checkToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Object} response object
 */
export const checkToken = async (req, res, next) => {
  let token = req.headers.authorization;
  token = stripBearerToken(token);
  try {
    if (token) {
      const decoded = await verifyToken(token);
      console.log('decoded', decoded);
      const user = await User.findById(decoded.id);
      if (!user) {
        console.log('error occured');
        return response(
          res,
          401,
          'error',
          { message: invalidToken },
          { message: invalidToken }
        );
      }
      req.payload = { ...req.payload, user };
      req.decoded = decoded;
      return next();
    }
    return response(res, 401, 'error', { message: noToken });
  } catch (error) {
    console.log(error);
    return response(res, 500, 'error', error);
  }
};
