import type { BunRequest, RouterTypes } from 'bun';

type RouteValue<T extends string> = RouterTypes.RouteValue<T>;
type RouteHandler<T extends string> = RouterTypes.RouteHandler<T>;

export type ResponseMiddleware = <
  T extends string,
  U extends RouteValue<T> = RouteValue<T>,
>(
  route: U,
  ctx?: unknown,
) => U;

export type HandlerMiddleware = <
  T extends string,
  U extends RouteHandler<T> = RouteHandler<T>,
>(
  route: U,
  ctx?: unknown,
) => U;

export function createResponseMiddleware({
  handleResponse,
}: { handleResponse: (res: Response) => Response }) {
  const middleware: ResponseMiddleware = (route) => {
    switch (true) {
      case route instanceof Response:
        return handleResponse(route) as typeof route;
      case route instanceof Function:
        return (async (req, server) => {
          const res = await route(req, server);
          return handleResponse(res);
        }) as typeof route;
      case route === false:
        return false as typeof route;
      default:
        return Object.fromEntries(
          Object.entries(route).map(([key, value]) => [key, middleware(value)]),
        ) as typeof route;
    }
  };
  return middleware;
}

export function createHandlerMiddleware({
  handleRequest,
  handleResponse,
}: {
  handleRequest?: (req: BunRequest) => BunRequest;
  handleResponse?: (res: Response) => Response;
}) {
  const middleware: HandlerMiddleware = (route) => {
    return (async (req, server) => {
      const request = handleRequest ? handleRequest(req) : req;
      const res = await route(request, server);
      return handleResponse ? handleResponse(res) : res;
    }) as typeof route;
  };
  return middleware;
}
