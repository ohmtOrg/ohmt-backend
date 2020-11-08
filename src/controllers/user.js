import { User } from '../models/user';
import { Org } from '../models/org';
import { generateToken } from '../utils/authHelper';
import response from '../utils/response';
import messages from '../utils/messages';
import bcrypt from 'bcryptjs';

/**
 * user signup controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      country,
      organisation,
    } = req.body;
    const org = Org.findById(organisation)
      .lean()
      .exec();

    if (!Org) {
      return response(res, 400, 'error', {
        message: 'Organisation does not exist',
      });
    }
    const user = {
      firstName,
      lastName,
      email,
      organisation,
      country,
      password,
    };
    console.log(here);
    const exists = await User.findOne({ email });
    if (exists)
      return response(res, 400, 'error', {
        message: 'Email address already in use',
      });

    const createdUser = await User.create(...user);
    const userData = {
      user: {
        id: createdUser._id,
        email: createdUser.email,
        token: generateToken({
          id: createdUser._id,
          role: createdUser.role,
        }),
      },
    };
    // const link = `${process.env.BACKEND_BASE_URL}/api/v1/user/verify/${userData.user.token}`;
    // const message = createTemplate(verifyEmailMessage, link);
    // await sendMail(userData.user.email, 'VERIFY EMAIL', message);
    return response(res, 200, 'success', userData);
  } catch (error) {
    return response(res, 500, 'error', { errors: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return response(res, 400, 'error', {
        message: 'Email address already in use',
      });

    const createdUser = await User.create({ ...req.body, role: 'admin' });
    const userData = {
      user: {
        id: createdUser._id,
        email: createdUser.email,
        token: generateToken({
          id: createdUser._id,
          role: createdUser.role,
        }),
      },
    };

    return response(res, 200, 'success', userData);
  } catch (error) {
    return response(res, 500, 'error', { errors: error.message });
  }
};

/**
 * user signin controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('inLogin');
    const user = await User.findOne({ email });
    if (!user)
      return response(res, 404, 'error', { message: messages.userNotFound });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response(res, 400, 'error', {
        message: messages.incorrectPassword,
      });
    }

    const token = generateToken({ id: user.id, role: user.role });
    return response(res, 200, 'success', { user, token });
  } catch (error) {
    response(res, 500, 'error', { error: error.message });
  }
};

/**
 * user signin controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const getMe = async (req, res) => {
  try {
    const { decoded } = req;

    const token = generateToken({ id: decoded.id, role: decoded.role });
    return response(res, 200, 'success', { decoded, token });
  } catch (error) {
    response(res, 500, 'error', { error: error.message });
  }
};
/**
 * User logout Function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - custom response
 */

// const logout = async (req, res) => {
//   const { id, exp } = req.decoded;
//   const token = req.headers.authorization.split(' ')[1];
//   try {
//     const blacklistData = { userId: id, expiresIn: exp, token };
//     await Tokenblacklist.create(blacklistData);
//     return response(res, 200, 'success', { message: messages.loggedOut });
//   } catch (e) {
//     return response(res, 500, 'error', {
//       errors: e.toString(),
//     });
//   }
// };

/**
 * get user details by id
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description get's details of logged in user
 */
// const getUserDetailsById = async (req, res) => {
//   try {
//     const { MANAGER, SUPER_ADMIN } = roles;
//     const {
//       query: { userId },
//       decoded: { id, roleId },
//     } = req;
//     if (userId && userId !== id && ![MANAGER, SUPER_ADMIN].includes(roleId)) {
//       return response(res, 403, 'error', { message: unauthorizedUserRequest });
//     }
//     const options = { attributes: { exclude: ['password'] } };
//     const user = await getById(User, userId || id, options);
//     return response(res, 200, 'success', { user });
//   } catch (error) {
//     return response(res, 500, 'error', { message: serverError });
//   }
// };

/**
 * update user details
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description updates details of logged in user
 */
const updateUserDetails = async (req, res) => {
  try {
    const { decoded } = req;
    const updatedUser = await User.FindOneAndUpdate.findOneAndUpdate(
      { _id: decoded._id },
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    return response(res, 202, 'success', {
      updatedUser,
    });
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

/**
 * set user role
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description set user role
 */
// const setUserRole = async (req, res) => {
//   try {
//     const { role: type } = req.body;
//     const { id: roleId } = await getByOptions(Role, {
//       where: { type },
//       attributes: ['id'],
//     });

//     const { userId: staffId } = req.params;
//     const options = { returning: true, where: { id: staffId } };
//     const [, [{ email: staffEmail }]] = await update(User, { roleId }, options);

//     const message = createTemplate(roleEmailMessage, type);
//     await sendMail(staffEmail, 'User Role Set', message);
//     return response(res, 200, 'success', { message: `${roleChanged} ${type}` });
//   } catch (error) {
//     return response(res, 500, 'error', { message: error.message });
//   }
// };

/**
 * redirect user to frontend after social auth
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {URL} - returns a redirect url
 * @description redirect user to frontend
 */
// const socialAuth = async (req, res) => {
//   try {
//     const { id, email } = req.user;
//     const token = generateToken({ id });
//     let URI = encodeURI(
//       `${FRONTEND_BASE_URL}/?callback=social&userId=${id}&email=${email}&token=${token}`
//     );
//     if (process.env.NODE_ENV === 'test') {
//       URI = encodeURI(
//         `${FRONTEND_BASE_URL}/?callback=social&userId=${id}&email=${email}&token=automaticgeneratedtoken`
//       );
//     }
//     return res.redirect(URI);
//   } catch (err) {
//     return response(res, 500, 'error', { message: serverError });
//   }
// };
/**
 * Handles user reset password
 *
 * @function
 * @param {Object} req - request object to the server
 * @param {Object} res - response object from the server
 *
 * @returns {Object} - password reset link
 */
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await findOne({email});
//     if (!user) {
//       return response(res, 404, 'error', {
//         message: 'user not found',
//       });
//     }
//     const token = generateToken(user.id, '10m');
//     const link = `${process.env.FONTEND_BASE_URL}/reset/password/${user.id}/${token}`;
//     const message = createTemplate(resetPasswordMessage, link);
//     await sendMail(user.email, 'Reset Password', message);
//     return response(res, 200, 'success', {
//       data: { link },
//       message: message.forgotPassword,
//     });
//   } catch (error) {
//     return response(res, 500, 'error', { error: error.message });
//   }
// };
/**
 * Handles user update password
 *
 * @function
 * @param {Object} req - The request object to the server
 * @param {Object} res - The response object from the server
 *
 * @returns {void} - no data returned
 */
// const resetPassword = async (req, res) => {
//   try {
//     const { userId, token } = req.params;
//     const { password } = req.body;
//     const user = await User.findByPk(userId);
//     await verifyResetPasswordToken(token);
//     if (!user)
//       return response(res, 404, 'error', { message: messages.userNotFound });
//     const options = { returning: true, where: { id: userId } };
//     const updatedUser = await update(User, { password }, options);
//     return response(
//       res,
//       200,
//       'success',
//       { message: 'Password updated successfully' },
//       updatedUser.lastName
//     );
//   } catch (error) {
//     return response(res, 500, 'error', { error: error.message });
//   }
// };

export default {
  signUp,
  signIn,
  updateUserDetails,
  getMe,
  createAdmin,
};
