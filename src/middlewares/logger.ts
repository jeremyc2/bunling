import { createHandlerMiddleware } from '..';

export const logger = createHandlerMiddleware({
  handleRequest(req) {
    console.log('Request:', req);
    return req;
  },
  handleResponse(res) {
    console.log('Response:', res);
    return res;
  },
});
