import userController from '../../controllers/userController';
import validate from '../../middlewares/validator';
import {
  signUpSchema,
  signInSchema,
  updateUserSchema,
  getUserSchema,
  setUserRoleSchema,
  emailSchema,
  passwordSchema,
} from '../../validation/userSchema';
import checkBlacklist from '../../middlewares/blacklistMiddleware';
import verifyEmailController from '../../controllers/emailVerificationController';
import { checkUserId, checkToken } from '../../middlewares/userMiddlewares';
import authorize from '../../middlewares/authorizer';
import roles from '../../utils/roles';

const {
  signUp,
  signIn,
  logout,
  getUserDetailsById,
  updateUserDetails,
  forgotPassword,
  resetPassword,
  setUserRole,
} = userController;

const { verifyEmail } = verifyEmailController;

const userRoute = router => {
  router.route('/user/signup').post(validate(signUpSchema), signUp);

  router.route('/user/signin').post(validate(signInSchema), signIn);
  router.route('/user/logout').post(checkToken, checkBlacklist, logout);

  // Email verification endpoint
  router.route('/user/verify/:token').get(verifyEmail);

  router
    .route('/users')
    .get(
      checkToken,
      checkBlacklist,
      validate(getUserSchema),
      checkUserId,
      getUserDetailsById
    );

  router
    .route('/users/:userId')
    .put(
      checkToken,
      checkBlacklist,
      multerUploads,
      validate(updateUserSchema),
      checkUserId,
      uploadImage,
      updateUserDetails
    );

  router.route('/forgot/password').post(validate(emailSchema), forgotPassword);
  router
    .route('/reset/password/:userId/:token')
    .patch(validate(passwordSchema), resetPassword);

  router
    .route('/role/users/:userId')

    .patch(
      checkToken,
      checkBlacklist,
      validate(setUserRoleSchema),
      authorize([roles.SUPER_ADMIN]),
      checkUserId,
      setUserRole
    );
};

export default userRoute;
