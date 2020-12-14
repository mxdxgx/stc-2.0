import * as express from "express";

export function entityIdentityMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const entityId: string = req.params.entityId;

  req.body = {
    entity: {
      id: entityId,
      name: entityId.charAt(0).toUpperCase() + entityId.slice(1),
    },
  };

  next();
}
