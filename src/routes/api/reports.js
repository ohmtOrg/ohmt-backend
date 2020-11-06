import reportController from '../../controllers/report';
import validate from '../../middlewares/validator';
import {
  createReportSchema,
  updateReportSchema,
} from '../../validation/reportSchema';

import { checkUserId, checkToken } from '../../middlewares/userMiddlewares';
import authorize from '../../middlewares/authorizer';
import roles from '../../utils/roles';

const {
  createReport,
  deleteReport,
  getOneReport,
  updateReportDetails,
  getAllReport,
  getMyReport,
} = reportController;

const reportRoute = router => {
  router
    .route('/report')
    .post(
      checkToken,
      authorize([roles.SUPER_ADMIN, roles.ADMIN]),
      validate(createReportSchema),
      createReport
    );

  router
    .route('/report')
    .get(
      checkToken,
      authorize([roles.SUPER_ADMIN, roles.ADMIN]),
      checkUserId,
      getAllReport
    );

  router
    .route('/report/:reportId')
    .put(
      checkToken,
      validate(updateReportSchema),
      checkUserId,
      updateReportDetails
    );
  router
    .route('/report/:reportId')
    .delete(checkToken, checkUserId, deleteReport);
  router
    .route('/report/:reportId')
    .get(
      checkToken,
      authorize([roles.SUPER_ADMIN, roles.ADMIN]),
      checkUserId,
      getOneReport
    );
  router.route('/report/me').get(checkToken, checkUserId, getMyreport);
};

export default reportRoute;
