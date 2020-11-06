import feedbackController from '../../controllers/feedback';
import validate from '../../middlewares/validator';
import {
  createFeedbackSchema,
  updateFeedbackSchema,
} from '../../validation/feedbackSchema';

import { checkUserId, checkToken } from '../../middlewares/userMiddlewares';
import authorize from '../../middlewares/authorizer';
import roles from '../../utils/roles';

const {
  createFeedback,
  updateFeedbackDetails,
  deleteFeedback,
  getAllFeedback,
  getOneFeedback,
} = feedbackController;

const feedbackRoute = router => {
  router
    .route('/feedback/new')
    .post(
      checkToken,
      validate(createFeedbackSchema),
      checkUserId,
      createFeedback
    );
  router
    .route('/feedback')
    .get(
      checkToken,
      authorize([roles.SUPER_ADMIN]),
      checkUserId,
      getAllFeedback
    );
  router
    .route('/feedback/:feedbackId')
    .get(checkToken, checkUserId, getOneFeedback);

  router
    .route('/feedback/:feedbackId')
    .put(
      checkToken,
      validate(updateFeedbackSchema),
      checkUserId,
      updateFeedbackDetails
    );

  router
    .route('/feedback/:feedbackId')

    .delete(checkToken, checkUserId, deleteFeedback);
};

export default feedbackRoute;
