import response from '../utils/response';
import roles from '../utils/roles';

/**
 * @function authorize
 * @param {Array} permitedRoles the roles allowed to use the route
 * @returns {Object} decoded object
 * @description checks if the user is allowed to access the route
 */
const authorize = permitedRoles => (req, res, next) => {
  const { role } = req.decoded;

  if (permitedRoles.includes(roleId) || roleId === roles.SUPER_ADMIN) {
    return next();
  }

  return response(res, 403, 'error', { message: 'access denied' });
};

export default authorize;
