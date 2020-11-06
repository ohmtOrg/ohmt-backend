import response from '../utils/response';
import userRoute from './api/user';
import orgRoutes from './api/org';
import feedbackRoutes from './api/feedback';
import reportRoute from './api/report';
const routes = router => {
  router.route('/').get((req, res) =>
    response(res, 200, 'success', {
      message: 'welcome to OHMT API',
    })
  );

  // user routes
  userRoute(router);
  // request routes
  reportRoute(router);
  // notification routes
  feedbackRoutes(router);

  // chat routes
  orgRoutes(router);
};

export default routes;
