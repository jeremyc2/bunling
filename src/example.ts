import { cors } from './middlewares/cors';
import { logger } from './middlewares/logger';

// Example usage of the middleware
const server = Bun.serve({
  routes: {
    '/': cors(() => new Response('Hello World', { status: 200 })),
    '/about': cors(new Response('About', { status: 200 })),
    '/test': cors({
      GET: () => new Response('Test', { status: 200 }),
      POST: () => new Response('Test', { status: 200 }),
    }),
    '/test2': {
      GET: cors(() => new Response('Test2', { status: 200 })),
      POST: () => new Response('Test2', { status: 200 }),
    },
    '/nothing': new Response('Nothing', { status: 200 }),
    '/log': logger(() => new Response('Logged', { status: 200 })),
    '/log-and-cors': logger(cors(() => new Response('Logged', { status: 200 }))),
  },
});

console.log("Started server on port:", server.port);