import orgController from '../../controllers/org';
import validate from '../../middlewares/validator';
import {
  createOrgSchema,
  updateOrgSchema,
} from '../../validation/organisationSchema';

import { checkUserId, checkToken } from '../../middlewares/userMiddlewares';
import authorize from '../../middlewares/authorizer';
import roles from '../../utils/roles';

const {
  createOrg,
  //   deleteOrg,
  //   getOneOrg,
  updateOrgDetails,
  //   getAllOrg,
} = orgController;

const orgRoute = router => {
  router
    .route('/org')
    .post(
      checkToken,
      authorize([roles.SUPER_ADMIN, roles.ADMIN]),
      validate(createOrgSchema),
      createOrg
    );

  //   router.route('/org').get(checkToken, checkUserId, getAllOrg);

  router
    .route('/org/:orgId')
    .put(
      checkToken,
      validate(updateOrgSchema),
      authorize([roles.SUPER_ADMIN, roles.ADMIN]),
      checkUserId,
      updateOrgDetails
    );
  //   router
  //     .route('/org/:orgId')
  //     .delete(
  //       checkToken,
  //       authorize([roles.SUPER_ADMIN, roles.ADMIN]),
  //       checkUserId,
  //       deleteOrg
  //     );
  //   router
  //     .route('/org/:orgId')
  //     .get(
  //       checkToken,
  //       authorize([roles.SUPER_ADMIN, roles.ADMIN]),
  //       checkUserId,
  //       getOneOrg
  //     );
};

export default orgRoute;
