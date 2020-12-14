import { baseController } from "../controllers/baseController";
import { ReadResourceRoute } from "../core/router/router.resourcesTypes";
import { entityIdentityMiddleware } from "../middlewares/entity.middleware";

export const RESOURCES_ROUTES = [
  new ReadResourceRoute({
    route: "/v2/:entityId",
    middlewares: [entityIdentityMiddleware],
    handler: baseController.getEntity,
  }),
];
