import userController from '../../controllers/user';
import validate from '../../middlewares/validator';
import {
  signUpSchema,
  signInSchema,
  updateUserSchema,
  // getUserSchema,
  // setUserRoleSchema,
  // emailSchema,
  // passwordSchema,
  createAdminSchema,
} from '../../validation/userSchema';
import verifyEmailController from '../../controllers/emailVerificationController';
import { checkUserId, checkToken } from '../../middlewares/userMiddlewares';
// import authorize from '../../middlewares/authorizer';
// import roles from '../../utils/roles';

const {
  signUp,
  signIn,
  // logout,
  getMe,
  updateUserDetails,
  createAdmin,
  // forgotPassword,
  // resetPassword,
  // setUserRole,
} = userController;

const { verifyEmail } = verifyEmailController;

const userRoute = router => {
  router.route('/user/signup').post(validate(signUpSchema), signUp);
  router
    .route('/user/signup/admin')
    .post(validate(createAdminSchema), createAdmin);

  router.route('/user/signin').post(validate(signInSchema), signIn);
  // router.route('/user/logout').post(checkToken, logout);

  // Email verification endpoint
  router.route('/user/verify/:token').get(verifyEmail);

  // router
  //   .route('/user')
  //   .get(
  //     checkToken,
  //     checkUserId,
  //     authorize([roles.SUPER_ADMIN,roles.ADMIN]),
  //     getAllUsers
  //   );
  // update me
  router
    .route('/user/:userId')
    .put(
      checkToken,
      validate(updateUserSchema),
      checkUserId,
      updateUserDetails
    );

  // get one user
  // router
  // .route('/user/:userId')
  // .get(
  //   checkToken,
  //   authorize([roles.SUPER_ADMIN,roles.ADMIN]),
  //   checkUserId,
  //   getAOneUser
  // );

  //get me
  router.route('/user/me').get(checkToken, getMe);
  //forget password
  // router.route('user/forgot/password').post(validate(emailSchema), forgotPassword);

  // reset password
  // router
  //   .route('/user/password/:userId/:token')
  //   .patch(validate(passwordSchema), resetPassword);

  //set user role
  // router
  //   .route('/user/roles/:userId')

  //   .patch(
  //     checkToken,
  //     checkBlacklist,
  //     validate(setUserRoleSchema),
  //     authorize([roles.SUPER_ADMIN]),
  //     checkUserId,
  //     setUserRole
  //   );
};

export default userRoute;
