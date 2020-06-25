import * as express from "express";
import { RESOURCES_ROUTES } from "./resources.route";
import { configs } from "../../config/configs";
import { ENDPOINT_TYPES } from "../core/router/endpoint.types";
import { logger } from "../server/server";

export class RoutesBuilder {
  public router: express.Router = express.Router();
  public buildApiRoutes() {
    for (const route of RESOURCES_ROUTES) {
      this.router[route.method](
        this.createApiEndpointRoute(route.routeParams.route),
        route.routeParams.middlewares,
        route.routeParams.handler
      );
    }
  }

  public buildDocRoutes() {
    throw new Error("not implemented yet!");
  }

  public createApiEndpointRoute(route: string): string {
    const endpoint: string = `/${ENDPOINT_TYPES.API}${configs.api.domainPath}${route}`;
    logger.info(endpoint);
    return endpoint;
  }
}
