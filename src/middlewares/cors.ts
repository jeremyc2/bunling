import { createResponseMiddleware } from '..';

export const cors = createResponseMiddleware({
  handleResponse(res) {
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    return res;
  },
});
