# bunling

A smol repo for adding middleware to [Bun](https://bun.sh).

Just a POC. Hoping to contribute to the Bun repo to address [this issue](https://github.com/oven-sh/bun/issues/17608)

- [x] Created [CORS](./src/middlewares/cors.ts) middleware
- [x] Created [logging](./src/middlewares/logger.ts) middleware
- [x] Run `bun --watch src/example.ts` to demo middleware-in-action

Inspired by Hono [createMiddleware](https://hono.dev/docs/helpers/factory#createmiddleware)