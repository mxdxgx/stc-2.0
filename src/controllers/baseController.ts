import * as express from "express";
import { getManager } from "typeorm";
import { configs } from "../../config/configs";

export class BaseController {
  public async getEntity(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    req.log.info(`${new Date()}`);

    const entities = await getManager()
      .getRepository(`${req.body.entity.name}`)
      .find();

    res.status(200).send({
      version: "2.0",
      revision: `${configs.revision.hash}`,
      lastModifiedAt: `${configs.revision.date}`,
      entries: {
        type: `${req.body.entity.id}`,
        items: entities,
      },
    });
  }
}

export const baseController: BaseController = new BaseController();
