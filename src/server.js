import express from 'express';
import { json, urlencoded } from 'body-parser';
// import morgan from 'morgan';
import config from './config';
import cors from 'cors';
import { connect } from './utils/db';
import response from './utils/response';

import routes from './routes';

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const router = express.Router();

// Pass router to routes
routes(router);

app.get('/', (req, res) =>
  response(res, 200, 'success', {
    message: 'welcome to OHM tool backend service',
  })
);
console.log('lets see here first');
app.use('/api/v1', router);
console.log('after calling api');
// Handle routes not found
app.use('*', (req, res) =>
  response(res, 404, 'error', {
    message: 'the requested endpoint is not found ',
  })
);
console.log('after calling bad request');

try {
  console.log('here i am ');
  connect();
  app.listen(config.port, () => {
    console.log(`REST API on http://localhost:${config.port}/api`);
  });
} catch (e) {
  console.error(e);
}

export default app;
