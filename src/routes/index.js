import response from '../utils/response';
import userRoute from './api/user';
import orgRoutes from './api/organisation';
import feedbackRoutes from './api/feedback';
import reportRoute from './api/reports';
const routes = router => {
  router.route('/').get((req, res) =>
    response(res, 200, 'success', {
      message: 'welcome to OHMT API',
    })
  );
  console.log('here in routes');
  // user routes
  userRoute(router);
  // request routes
  reportRoute(router);
  // notification routes
  feedbackRoutes(router);

  // chat routes
  orgRoutes(router);
  console.log('afterroutes');
};

export default routes;
